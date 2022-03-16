import { useQuery } from "react-query";
import { fetchClient } from "../util";
import { useGetEntryMeta } from "../hooks";

export function useGetEntryBody(entryId) {
  const { data: entryMeta } = useGetEntryMeta(entryId);

  const {
    status,
    data: entryBody,
    error,
  } = useQuery(
    ["entry_body", entryMeta?.sha],
    fetchClient(`/api/entries/${entryMeta?.sha}`),
    { enabled: !!entryMeta?.sha }
  );

  if (entryBody) {
    return {
      status,
      data: entryBody,
    };
  }

  if (status === "error") {
    return {
      status,
      message: error.message,
    };
  }

  return {
    status,
  };
}
