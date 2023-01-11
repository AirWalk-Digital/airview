import { useGetEntryQuery } from "../store";
import { useGetCurrentBranch } from "../use-get-branches";

export function useGetEntry(entryId) {
  console.log("eee", entryId);
  const branch = useGetCurrentBranch();
  const sha = "a05bda22cb6ba7e9ee2a0a03702c27d480bf4e8f";

  const entryQuery = useGetEntryQuery(sha, {
    skip: !branch?.sha,
  });

  return entryQuery;
}
