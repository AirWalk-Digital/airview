import { useQuery } from "react-query";
import { fetchClient } from "../util";

export function useGetAllBranches() {
  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useQuery("branches", fetchClient("/api/branches"));

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
