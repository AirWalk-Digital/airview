import React from "react";
import { useGetEntryMeta } from "airview-cms";
import { DataOutput } from "../components";

export function SingleEntryMeta() {
  const { data, isLoading, isFetching, isError, error } = useGetEntryMeta(
    "knowledge/place_call_on_hold"
  );

  return (
    <DataOutput
      title="Single Entry Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
