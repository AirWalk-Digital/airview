import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(entryId) {
  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: entriesMeta,
    error,
  } = useGetAllEntriesMeta();

  const filteredEntries = useMemo(() => {
    if (!entriesMeta || !entryId) return;

    const { parent, collection } = entriesMeta.find(
      (entry) => entry.id === entryId
    );

    if (!parent || !collection) return;

    return entriesMeta.filter(
      (entry) => entry?.parent === parent && entry?.collection === collection
    );
  }, [entriesMeta, entryId]);

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: filteredEntries,
    error,
  };

  // if (entriesMeta) {
  //   return {
  //     status,
  //     data: filteredEntries,
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
