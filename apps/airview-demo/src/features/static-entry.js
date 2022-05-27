import React from "react";
import { useGetEntry } from "airview-cms";

export function StaticEntry() {
  const { data, isLoading, isFetching, isError, error } = useGetEntry(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching static entry...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching static entry</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
