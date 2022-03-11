import React from "react";
import { useGetAllEntriesMeta } from "./hooks";
import { PrintJson } from "./components";

export function AllEntriesMeta() {
  const { status, data } = useGetAllEntriesMeta();

  return (
    <div>
      <h3>All Entries Meta</h3>
      <p>
        <i>useGetAllEntriesMeta()</i>
      </p>
      {status === "loading" ? (
        <div>Loading All Entries Meta</div>
      ) : (
        <PrintJson data={data} />
      )}
      <hr />
    </div>
  );
}
