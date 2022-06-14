import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(entryId) {
  const values = [];

  const findSiblings = (entries) => {
    const entry = entries?.find((entry) => entry.id === entryId);

    if (!entry) return;

    const { parent: entryParent } = entry.meta;
    const collection = entry?.collection;

    if (!entryParent || !collection) return;

    const siblings = entries.filter(
      (entryItem) =>
        entryItem.meta?.parent === entryParent &&
        entryItem.collection === collection
    );

    return siblings.length
      ? (() => {
          values.length = 0;
          values.push(...siblings);
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
        data: findSiblings(entries),
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
