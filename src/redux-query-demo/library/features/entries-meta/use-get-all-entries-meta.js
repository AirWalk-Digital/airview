import { useSelector } from "react-redux";
import { useGetAllEntriesMetaQuery } from "./entries-meta-api";
import { selectWorkingBranch, useGetBranchesQuery } from "../branching";

const every = require("lodash/every");

export function useGetAllEntriesMeta(select, dependencies = []) {
  const workingBranch = useSelector(selectWorkingBranch);

  const { data: branchQueryData } = useGetBranchesQuery();

  const branchSha = branchQueryData?.filter(
    (branch) => branch.name === workingBranch
  )[0]?.sha;

  return useGetAllEntriesMetaQuery(
    { branch: workingBranch, branchSha },
    {
      skip: !every([
        workingBranch,
        branchQueryData,
        branchSha,
        ...dependencies,
      ]),
      //...(select && { selectFromResult: select }),
    }
  );
}
