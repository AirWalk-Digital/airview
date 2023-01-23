import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetCollectionEntries(collectionId) {
  const findCollectionEntries = (entries) => {
    if (!entries) return;

    return entries[collectionId];
  };

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
        data: findCollectionEntries(entries),
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
