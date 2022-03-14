import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

  const entryMeta = useMemo(() => {
    if (!entriesMeta || !entryId) return;

    const meta = entriesMeta.filter((entryMeta) => entryMeta.id === entryId)[0];

    return {
      ...meta,
    };
  }, [entriesMeta, entryId]);

  if (entryMeta) {
    return {
      status,
      data: entryMeta,
    };
  }

  if (status === "error") {
    return {
      status,
      message: error.message,
    };
  }

  return {
    status,
  };
}
