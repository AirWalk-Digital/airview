import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
  return useGetAllEntriesMeta((entries) => entries[entryId]);
}
