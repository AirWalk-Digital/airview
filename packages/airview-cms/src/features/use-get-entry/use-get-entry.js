import { useGetEntryQuery } from "../store";
import { useGetCurrentBranch } from "../use-get-branches";

export function useGetEntry({ entryId, path }) {
  const branch = useGetCurrentBranch();

  const entryQuery = useGetEntryQuery(
    {
      branchSha: branch?.sha,
      path: `${entryId}/${path}`,
    },
    {
      skip: !branch?.sha,
    }
  );

  return entryQuery;
}
