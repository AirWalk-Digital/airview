import React from "react";
import { useGetAllEntriesMeta } from "./hooks";
import { PrintJson } from "./components";

export function AllEntriesMeta() {
  const { isLoading, isFetching, isSuccess, isError, data, error } =
    useGetAllEntriesMeta();

  return (
    <div>
      <h3>All Entries Meta</h3>
      <p>
        <i>useGetAllEntriesMeta()</i>
      </p>
      {isLoading || isFetching ? (
        <div>Loading All Entries Meta</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <PrintJson data={{ error: error.message }} />}
        </>
      )}
      <hr />
    </div>
  );
}
