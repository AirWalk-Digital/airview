import { useGetEntryQuery } from "../store";
import { useGetEntryMeta } from "../use-get-all-entries-meta";

export function useGetEntry(entryId) {
  const { data, isSuccess } = useGetEntryMeta(entryId);

  const entryQuery = useGetEntryQuery(data?.sha, {
    skip: !data?.sha,
  });

  if (isSuccess && !data?.sha) {
    return {
      data: null,
      isLoading: false,
      isFetching: false,
      isError: true,
      error: {
        status: 404,
        message: `${entryId} not found`,
      },
    };
  }

  return entryQuery;
}
