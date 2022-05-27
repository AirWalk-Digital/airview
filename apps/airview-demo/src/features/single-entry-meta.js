import React from "react";
import { useGetEntryMeta } from "airview-cms";

export function SingleEntryMeta() {
  const { data, isLoading, isFetching, isError, error } = useGetEntryMeta(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching entry meta...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching entry meta</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
