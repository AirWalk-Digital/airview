import React from "react";
import { useGetEntry } from "airview-cms";
import { DataOutput } from "../components";

export function StaticEntry({ entryId }) {
  const { data, isLoading, isFetching, isError, error } = useGetEntry(entryId);

  return (
    <DataOutput
      title="Static Entry"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
