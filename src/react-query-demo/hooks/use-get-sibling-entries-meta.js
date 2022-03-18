import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(entryId) {
  return useGetAllEntriesMeta((entriesMeta) => {
    if (!entryId) return;

    const { parent, collection } =
      entriesMeta.find((entry) => entry.id === entryId) ?? {};

    if (!parent || !collection) return [];

    return entriesMeta.filter(
      (entryMeta) =>
        entryMeta?.parent === parent && entryMeta.collection === collection
    );
  });
}
