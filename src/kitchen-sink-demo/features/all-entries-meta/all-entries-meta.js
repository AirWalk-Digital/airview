import React from "react";
import { useGetAllEntriesMeta } from "../../../lib";
import { PrintJson } from "../../components";

export function AllEntriesMeta() {
  const { isLoading, isFetching, isSuccess, isError, data } =
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
          {isError && <div>Error fetching all entries meta</div>}
        </>
      )}
      <hr />
    </div>
  );
}
