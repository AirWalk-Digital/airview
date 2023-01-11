import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetCollectionEntries(collectionId) {
  //  const values = [];

  const findCollectionEntries = (entries) => {
    if (!entries) return;

    return entries[collectionId];
    /*
    const collectionEntries = entries.filter(
      (entry) => entry.collection === collectionId
    );

    return collectionEntries.length
      ? (() => {
          values.length = 0;
          values.push(...collectionEntries);
          return values;
        })()
      : undefined;
      */
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
