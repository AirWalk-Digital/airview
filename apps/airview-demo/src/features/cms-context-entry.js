import React from "react";
import { Navigate } from "react-router-dom";
import { useSetCmsContext } from "airview-cms";
import { DataOutput } from "../components/";

export function CmsContextEntry({ entryId }) {
  const { data, isLoading, isFetching, isError, error } =
    useSetCmsContext(entryId);

  if (isError && error.type === 404) {
    return <Navigate to="/not-found" replace={true} />;
  }

  return (
    <DataOutput
      title="CMS Context Entry"
      {...{ isLoading, isFetching, isError, error, data }}
    />
  );
}
