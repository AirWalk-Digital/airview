import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(entryId) {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

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
