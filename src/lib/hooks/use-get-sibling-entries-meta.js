import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

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
        entryData.meta?.parent === parent &&
        entryData.collection === collection &&
        entryId !== id
    );

    return Object.fromEntries(filteredEntries);
  });
}
