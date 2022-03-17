import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(entryId) {
  return useGetAllEntriesMeta((entries) => {
    if (!entryId) return;
    return entries.filter((entry) => entry?.parent === entryId);
  });
}
