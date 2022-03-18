import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntriesMetaByCollection(collection) {
  return useGetAllEntriesMeta((entries) =>
    entries.filter((entry) => entry.collection === collection)
  );
}
