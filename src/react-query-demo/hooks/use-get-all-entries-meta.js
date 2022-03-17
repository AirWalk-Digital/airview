import { useQuery } from "react-query";
import { fetchClient } from "../util";

export function useGetAllEntriesMeta(select) {
  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery("entries_meta", fetchClient("/api/entries"), { select });

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
