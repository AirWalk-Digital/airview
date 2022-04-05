import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(parentEntryId) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    //if (!parentEntryId) return { data: undefined, ...rest };

    if (!data) return { data, ...rest };

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) => entryData.meta?.parent === parentEntryId
    );

    return { data: Object.fromEntries(filteredEntries), ...rest };
  }, parentEntryId);
}
