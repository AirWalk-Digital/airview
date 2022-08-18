import { useSelector } from "react-redux";
import { selectWorkingBranch } from "../cms";
import { useGetBranchesQuery } from "../store";

export function useGetCurrentBranch() {
  const workingBranch = useSelector(selectWorkingBranch);

  const { branch } = useGetBranchesQuery(undefined, {
    selectFromResult: ({ data }) => {
      return {
        branch: data?.find((branch) => branch.name === workingBranch),
      };
    },
  });
  return branch;
}
