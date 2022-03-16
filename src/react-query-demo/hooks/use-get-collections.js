import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetCollections() {
  const { isLoading, isError, isSuccess, isIdle, isFetching, data, error } =
    useGetAllEntriesMeta();

  const collections = useMemo(() => {
    if (!data) return;

    return data.reduce((prevValue, currentValue) => {
      if (prevValue.includes(currentValue?.collection)) return prevValue;

      return [...prevValue, currentValue?.collection];
    }, []);
  }, [data]);

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: collections,
    error,
  };
}
