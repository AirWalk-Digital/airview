import { useQuery } from "react-query";
import { fetchClient } from "../../util";
import { useGetEntryMeta, useGetCurrentBranch } from "../../features";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);
  const { data: currentBranch } = useGetCurrentBranch();

  const sha = entryMeta?.sha;
  const branchName = currentBranch?.name;

  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entry_body", [sha]],
      fetchClient(`/api/content/${entryId}/${branchName}`),
      { enabled: !!entryId && !!sha && !!branchName }
    );

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
