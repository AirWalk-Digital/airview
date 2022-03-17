import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(entryId) {
  return useGetAllEntriesMeta((entries) =>
    entries.filter((entry) => entry?.parent === entryId)
  );
}
