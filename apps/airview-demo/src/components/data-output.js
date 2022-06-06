import React from "react";

export function DataOutput({
  title,
  isLoading,
  isFetching,
  isError,
  error,
  data,
}) {
  return (
    <div>
      <h2>{title}</h2>
      {isFetching || isLoading ? (
        <div>Fetching...</div>
      ) : isError ? (
        <React.Fragment>
          <div>Error Fetching Content</div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </React.Fragment>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>No data</div>
      )}
      <hr />
    </div>
  );
}
