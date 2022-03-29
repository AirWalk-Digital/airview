import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntriesMetaByCollection(collection) {
  return useGetAllEntriesMeta((entries) => {
    const filteredEntries = Object.entries(entries).filter(
      ([entryId, entryData]) => entryData.collection === collection
    );

    return Object.fromEntries(filteredEntries);
  });
}
