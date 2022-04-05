import { useSelector } from "react-redux";
import { selectWorkingBranch } from "../branching";
import { useGetAllEntriesMeta } from "../entries-meta";
import { useGetEntryQuery } from "./entry-api";

const every = require("lodash/every");

export function useGetEntry(entryId) {
  const workingBranch = useSelector(selectWorkingBranch);

  const { data: entryMeta } = useGetAllEntriesMeta(({ data }) => {
    return { data: data?.[entryId] };
  });

  const entrySha = entryMeta?.sha;

  const { status, data, error } = useGetEntryQuery(
    { entryId, branch: workingBranch, entrySha },
    {
      skip: !every([entryId, workingBranch, entrySha]),
    }
  );

  return { status, data, error };
}
