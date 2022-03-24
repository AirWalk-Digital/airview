import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta, useGetCurrentBranch } from "../hooks";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);
  const { data: currentBranch } = useGetCurrentBranch();

  const contentVersion = entryMeta?.contentVersion;
  const branchName = currentBranch?.name;

  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entry_body", [entryId, contentVersion]],
      fetchClient(`/api/content/${entryId}/${branchName}`),
      { enabled: !!entryId && !!contentVersion && !!branchName }
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
