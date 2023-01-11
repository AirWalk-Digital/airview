import { useGetAllEntriesMeta } from "./use-get-all-entries-meta";

export function useGetEntryMeta(entry) {
  console.log("entry", entry);
  const [collection, entity, path] = (entry || "")
    .replace(/^\//, "")
    .split("/", 3);
  console.log(entry);
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
        data: entry && ((entries[collection] || {})[entity] || {})[path],
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
