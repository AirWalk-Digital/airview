import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta } from "../hooks";

export function useGetCurrentBranch() {
  return { data: { name: "main", sha: "xyz", isProtected: false } };
}
