import { useSelector } from "react-redux";
import { selectWorkingBranch } from "../branching";
import { useGetEntryMeta } from "../entries-meta";
import { useGetEntryQuery } from "./entry-api";

const every = require("lodash/every");

export function useGetEntry(entryId) {
  const workingBranch = useSelector(selectWorkingBranch);

  const { data: entryMeta, isFetching, isSuccess } = useGetEntryMeta(entryId);

  const entrySha = entryMeta?.[entryId]?.sha;

  const { status, data, error } = useGetEntryQuery(
    { entryId, branch: workingBranch, entrySha },
    {
      skip: !every([entryId, workingBranch, entryMeta, !isFetching, isSuccess]),
    }
  );

  return { status, data, error };
}
