import { useMemo } from "react";
import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntriesMetaByCollection(collection) {
  const { status, data: entriesMeta, error } = useGetAllEntriesMeta();

  const filteredCollections = useMemo(() => {
    if (!entriesMeta || !collection) return;

    return entriesMeta.filter((entry) => entry?.collection === collection);
  }, [entriesMeta, collection]);

  if (entriesMeta) {
    return {
      status,
      data: filteredCollections,
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
