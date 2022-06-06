import React from "react";
import { useGetEntryMeta } from "airview-cms";
import { DataOutput } from "../components";

export function SingleEntryMeta({ entryId }) {
  const { data, isLoading, isFetching, isError, error } =
    useGetEntryMeta(entryId);

  return (
    <DataOutput
      title="Single Entry Meta"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
