import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta } from "../hooks";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);

  /*
    useGetBranches() => array of branch data => [{name: 'main', sha: '', isProtected: false} ]
    useGetCurrentBranch() => look up branch in store, return data from useGetBranches with filter => {name:"main", sha: "abc", isProtected: false}
    useSetBranch(name) => set branch in stor 

  */

  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entry_body", [entryId, "xyz"]],
      fetchClient(`/api/content/${entryId}/xyz`),
      { enabled: !!entryId }
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
