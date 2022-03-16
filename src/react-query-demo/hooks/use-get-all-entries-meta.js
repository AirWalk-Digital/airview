import { useQuery } from "react-query";
import { fetchClient } from "../util";

export function useGetAllEntriesMeta() {
  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery("entries_meta", fetchClient("/api/entries"));

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
