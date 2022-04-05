import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
  return useGetAllEntriesMeta(
    ({ data, ...rest }) => ({
      data: data[entryId],
      ...rest,
    }),
    entryId
  );
}
