import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetRelated(entry) {
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
          ((entries[entry.collection] || {})[entry.entry] || { files: {} })
            .files,
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
