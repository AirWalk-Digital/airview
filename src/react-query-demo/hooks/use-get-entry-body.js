import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta } from "../hooks";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);

  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery(
      ["entry_body", entryMeta?.sha],
      fetchClient(`/api/entries/${entryMeta?.sha}`),
      { enabled: !!entryMeta?.sha }
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
