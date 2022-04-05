import React from "react";
import { useGetChildEntriesMeta } from "../../../library";
import { PrintJson } from "./print-json";

export function ChildEntriesMeta({ entryId }) {
  const { data, isLoading, isFetching, isError } =
    useGetChildEntriesMeta(entryId);

  const renderBody = () => {
    if (isError) return <p>An error occurred trying to fetch the data</p>;

    if (isLoading) return <p>Loading data...</p>;

    if (!data) return <p>There are no child entries</p>;

    return <PrintJson data={data} />;
  };

  return (
    <React.Fragment>
      <h3>Child Entries Meta:</h3>
      {renderBody()}
    </React.Fragment>
  );
}
