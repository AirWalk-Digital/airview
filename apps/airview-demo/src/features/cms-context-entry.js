import React from "react";
import { useSetCmsContext } from "airview-cms";
import { DataOutput } from "../components/";

export function CmsContextEntry({ entryId }) {
  const { data, isLoading, isFetching, isError, error } =
    useSetCmsContext(entryId);

  return (
    <DataOutput
      title="CMS Context Entry"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
