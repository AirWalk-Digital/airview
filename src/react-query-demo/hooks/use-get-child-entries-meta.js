import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(entryId) {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

  const filteredEntries = useMemo(() => {
    if (!entriesMeta || !entryId) return;

    return entriesMeta.filter((entry) => entry?.parent === entryId);
  }, [entriesMeta, entryId]);

  if (entriesMeta) {
    return {
      status,
      data: filteredEntries,
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
