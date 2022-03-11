import React from "react";
import { useGetAllEntriesMeta } from "./hooks";
import { PrintJson } from "./components";

export function AllEntriesMeta() {
  const { status, data } = useGetAllEntriesMeta();

  if (status === "loading") {
    return <div>Loading All Entries Meta</div>;
  }

  return (
    <div>
      <h3>All Entries Meta</h3>
      <p>
        <i>useGetAllEntriesMeta()</i>
      </p>
      <PrintJson data={data} />
      <hr />
    </div>
  );
}
