import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

// Currently returns self in result, should we omit self from result??
export function useGetSiblingEntriesMeta(id) {
  return useGetAllEntriesMeta((entries) => {
    if (!id) return;

    const {
      meta: { parent },
      collection,
    } = entries[id];

    if (!parent || !collection) return {};

    const filteredEntries = Object.entries(entries).filter(
      ([entryId, entryData]) =>
        entryData.meta?.parent === parent && entryData.collection === collection
    );

    return Object.fromEntries(filteredEntries);
  });
}
