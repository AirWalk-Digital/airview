import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entryId) {
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
        data: entries?.find((entry) => entry.id === entryId),
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
