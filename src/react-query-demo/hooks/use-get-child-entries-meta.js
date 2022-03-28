import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(id) {
  return useGetAllEntriesMeta((entries) => {
    if (!id) return;

    const filteredEntries = Object.entries(entries).filter(
      ([entryId, entryData]) => entryData.meta?.parent === id
    );

    return Object.fromEntries(filteredEntries);
  });
}
