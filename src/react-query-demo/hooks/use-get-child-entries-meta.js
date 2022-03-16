import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(entryId) {
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

    return entriesMeta.filter((entry) => entry?.parent === entryId);
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
}
