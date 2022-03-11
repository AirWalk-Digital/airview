import { useQuery } from "react-query";
import { fetchClient } from "../util";

export function useGetEntryBody(entryId) {
  const {
    status,
    data: entryBody,
    error,
  } = useQuery(
    ["entry_body", entryId],
    fetchClient(`/api/entries/${entryId}/body`),
    { enabled: !!entryId }
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
