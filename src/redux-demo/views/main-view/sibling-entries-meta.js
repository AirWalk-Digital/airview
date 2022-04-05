import React from "react";
import { useGetSiblingEntriesMeta } from "../../library";
import { PrintJson } from "./print-json";

export function SiblingEntriesMeta({ entryId }) {
  const { data, isLoading, isFetching, isError } =
    useGetSiblingEntriesMeta(entryId);

  const renderBody = () => {
    if (isError) return <p>An error occurred trying to fetch the data</p>;

    if (isLoading) return <p>Loading data...</p>;

    if (!data) return <p>There are no sibling entries</p>;

    return <PrintJson data={data} />;
  };

  return (
    <React.Fragment>
      <h3>Sibling Entries Meta:</h3>
      {renderBody()}
    </React.Fragment>
  );
}
