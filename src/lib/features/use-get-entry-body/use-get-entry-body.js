import { useMemo } from "react";
import { useQuery } from "react-query";
import matter from "gray-matter";
import { fetchClient } from "../../util";
import { useGetEntryMeta, useGetCurrentBranch } from "../../features";

global.Buffer = global.Buffer || require("buffer").Buffer;

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);
  const { data: currentBranch } = useGetCurrentBranch();

  const sha = entryMeta?.sha;
  const branchName = currentBranch?.name;

  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: markdownData,
    error,
  } = useQuery(
    ["entry_body", [sha]],
    fetchClient(`/api/content/${entryId}/${branchName}`),
    { enabled: !!entryId && !!sha && !!branchName }
  );

  const data = useMemo(() => decodeMarkdownData(markdownData), [markdownData]);

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data,
    error,
  };
}

function decodeMarkdownData(markdownData) {
  if (!markdownData) return null;

  const decodedData = Object.entries(markdownData).map(([key, value]) => {
    return [key, matter(atob(value))];
  });

  return Object.fromEntries(decodedData);
}
