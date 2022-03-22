import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta, useGetCurrentBranch } from "../hooks";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);
  const { data: currentBranch } = useGetCurrentBranch();

  /*
    useGetBranches() => array of branch data => [{name: 'main', sha: '', isProtected: false} ]
    useGetCurrentBranch() => look up branch in store, return data from useGetBranches with filter => {name:"main", sha: "abc", isProtected: false}
    useSetBranch(name) => set branch in stor 

  */

  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entry_body", [entryId, entryMeta?.contentVersion]],
      fetchClient(`/api/content/${entryId}/${currentBranch.sha}`),
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
