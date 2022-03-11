import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(collectionId, entryId) {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

  const filteredEntries = useMemo(() => {
    if (!entriesMeta || !entryId || !collectionId) return;

    return entriesMeta.filter(
      (entry) => entry?.parent === entryId && entry?.collection === collectionId
    );
  }, [entriesMeta, entryId, collectionId]);

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
