import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
  const {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: entriesMeta,
    error,
  } = useGetAllEntriesMeta();

  const entryMeta = useMemo(() => {
    if (!entriesMeta || !entryId) return;

    const meta = entriesMeta.filter((entryMeta) => entryMeta.id === entryId)[0];

    return {
      ...meta,
    };
  }, [entriesMeta, entryId]);

  return {
    isLoading,
    isError,
    isSuccess,
    isIdle,
    isFetching,
    data: entryMeta,
    error,
  };
}
