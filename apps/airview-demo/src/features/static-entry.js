import React from "react";
import { useGetEntry } from "airview-cms";
import { DataOutput } from "../components";

export function StaticEntry() {
  const { data, isLoading, isFetching, isError, error } = useGetEntry(
    "knowledge/place_call_on_hold"
  );

  return (
    <DataOutput
      title="Static Entry"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
