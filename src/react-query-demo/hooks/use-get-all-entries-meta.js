import { useQuery } from "react-query";
import { fetchClient } from "../util";

export function useGetAllEntriesMeta() {
  const { status, data, error } = useQuery(
    "entries_meta",
    fetchClient("/api/entries")
  );

  if (data) {
    return {
      status,
      data,
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
