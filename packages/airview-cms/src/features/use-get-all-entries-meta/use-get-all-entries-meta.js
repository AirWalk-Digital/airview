import { useSelector } from "react-redux";
import { selectWorkingBranch } from "../toolbar";
import { useGetBranchesQuery, useGetEntriesQuery } from "../airview-api";

export function useGetAllEntriesMeta() {
  const workingBranch = useSelector(selectWorkingBranch);

  const { branch } = useGetBranchesQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        branch: data?.find((branch) => branch.name === workingBranch),
      };
    },
  });

  return useGetEntriesQuery(branch?.sha, {
    skip: !branch?.sha,
  });
}
