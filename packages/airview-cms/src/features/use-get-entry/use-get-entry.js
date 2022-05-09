import { useGetEntryQuery } from "../store";
import { useGetAllEntriesMeta } from "../use-get-all-entries-meta";

export function useGetEntry(entryId) {
  const { entryMetaData, isSuccess } = useGetAllEntriesMeta(
    ({ data, isSuccess }) => ({
      isSuccess,
      entryMetaData: data?.find((entry) => entry.id === entryId),
    })
  );

  const entryQuery = useGetEntryQuery(entryMetaData?.sha, {
    skip: !entryMetaData?.sha,
  });

  if (isSuccess && !entryMetaData?.sha) {
    return {
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: {
        type: 404,
        message: `${entryId} not found`,
      },
    };
  }

  return entryQuery;
}
