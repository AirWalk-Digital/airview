import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntriesMetaByCollection(collection) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    if (!data) return { data, ...rest };

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) => entryData.collection === collection
    );

    return { data: Object.fromEntries(filteredEntries), ...rest };
  }, collection);
}
