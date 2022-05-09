import { useSelector } from "react-redux";
import { selectWorkingBranch } from "../cms";
import { useGetBranchesQuery, useGetEntriesQuery } from "../airview-store";

export function useGetAllEntriesMeta(select) {
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
    ...(select && { selectFromResult: select }),
  });
}
