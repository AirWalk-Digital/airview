import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetSiblingEntriesMeta(id) {
  return useGetAllEntriesMeta(({ data, ...rest }) => {
    if (!data) return { data, ...rest };

    const {
      meta: { parent },
      collection,
    } = data[id];

    if (!parent || !collection) return {};

    const filteredEntries = Object.entries(data).filter(
      ([entryId, entryData]) =>
        entryData.meta?.parent === parent &&
        entryData.collection === collection &&
        entryId !== id
    );

    return {
      data: filteredEntries.length ? Object.fromEntries(filteredEntries) : null,
      ...rest,
    };
  }, id);
}
