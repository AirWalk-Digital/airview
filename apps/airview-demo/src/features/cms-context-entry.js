import React from "react";
import { useSetCmsContext } from "airview-cms";
import { DataOutput } from "../components/";

export function CmsContextEntry() {
  const { data, isLoading, isFetching, isError, error } = useSetCmsContext(
    "knowledge/place_call_on_hold"
  );

  return (
    <DataOutput
      title="CMS Context Entry"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
