import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetChildEntriesMeta(entryId) {
  const values = [];

  const findChildren = (entries) => {
    if (!entries) return;

    const childEntries = entries.filter(
      (entry) => entry.meta?.parent === entryId
    );

    return childEntries.length
      ? (() => {
          values.length = 0;
          values.push(...childEntries);
          return values;
        })()
      : undefined;
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
        data: findChildren(entries),
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
