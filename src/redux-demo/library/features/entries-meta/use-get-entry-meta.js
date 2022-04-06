import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    const entry = data?.[entryId] ?? null;

    return {
      data: entry,
      ...rest,
    };
  }, entryId);
}
