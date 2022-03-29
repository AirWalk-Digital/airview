import { useQuery } from "react-query";
import { fetchClient } from "../../util";
import { useGetCurrentBranch } from "../../features";

export function useGetAllEntriesMeta(select) {
  const { data: branchData } = useGetCurrentBranch();
  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entries_meta", branchData.sha],
      fetchClient(`/api/entries/${branchData.name}`),
      {
        select,
      }
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
