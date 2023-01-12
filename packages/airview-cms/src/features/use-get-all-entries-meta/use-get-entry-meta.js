import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entry) {
  return useGetAllEntriesMeta(
    ({
      data: entries,
      isUninitialized,
      isLoading,
      isFetching,
      isSuccess,
      isError,
      error,
    }) => {
      return {
        data:
          entries &&
          entry &&
          ((entries[entry.collection] || {})[entry.entry] || {})[entry.path],
        isUninitialized,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error,
      };
    }
  );
}
