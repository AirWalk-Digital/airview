import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(entryId) {
  return useGetAllEntriesMeta((entries) => {
    if (!entryId) return;

    const { parent, collection } = entries.find(
      (entry) => entry.id === entryId
    );

    if (!parent) return;

    return entries.filter(
      (entry) => entry?.parent === parent && entry.collection === collection
    );
  });
}
