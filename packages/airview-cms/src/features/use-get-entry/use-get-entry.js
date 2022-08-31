import { useGetEntryQuery } from "../store";
import { useGetCurrentBranch } from "../use-get-branches";

export function useGetEntry(entryId, path) {
  const branch = useGetCurrentBranch();
  /*
  const { entryMetaData, isSuccess } = useGetAllEntriesMeta(
    ({ data, isSuccess }) => ({
      isSuccess,
      entryMetaData: data?.find((entry) => entry.id === entryId),
    })
  );
  */

  const entryQuery = useGetEntryQuery({
    branchSha: branch?.sha,
    path: `${entryId}/${path}`,
  });

  // if (isSuccess) {
  //   return {
  //     data: null,
  //     isLoading: false,
  //     isFetching: false,
  //     isError: true,
  //     error: {
  //       type: 404,
  //       message: `${entryId} not found`,
  //     },
  //   };
  // }

  return entryQuery;
}
