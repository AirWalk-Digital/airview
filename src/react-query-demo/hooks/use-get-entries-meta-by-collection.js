import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntriesMetaByCollection(collection) {
  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: entriesMeta,
    error,
  } = useGetAllEntriesMeta();

  const filteredCollections = useMemo(() => {
    if (!entriesMeta || !collection) return;

    return entriesMeta.filter((entry) => entry?.collection === collection);
  }, [entriesMeta, collection]);

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: filteredCollections,
    error,
  };

  // if (entriesMeta) {
  //   return {
  //     status,
  //     data: filteredCollections,
  //   };
  // }

  // if (status === "error") {
  //   return {
  //     status,
  //     message: error.message,
  //   };
  // }

  // return {
  //   status,
  // };
}
