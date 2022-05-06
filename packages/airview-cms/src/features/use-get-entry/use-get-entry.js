import { useGetEntryQuery } from "../airview-api";
import { useGetAllEntriesMeta } from "../use-get-all-entries-meta";

export function useGetEntry(entryId) {
  const { entryMetaData } = useGetAllEntriesMeta(({ data }) => ({
    entryMetaData: data?.find((entry) => entry.id === entryId),
  }));

  return useGetEntryQuery(entryMetaData?.sha, {
    skip: !entryMetaData?.sha,
  });
}
