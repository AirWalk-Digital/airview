import { useGetAllEntriesMeta } from "../../features";

export function useGetEntryMeta(entryId) {
  return useGetAllEntriesMeta((entries) => entries[entryId]);
}
