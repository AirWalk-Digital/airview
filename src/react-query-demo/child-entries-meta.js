import React, { useState } from "react";
import { useGetChildEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function ChildEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");

  const { isLoading, isFetching, isSuccess, isError, data } =
    useGetChildEntriesMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Child Entries Meta</h3>
      <p>
        <i>useGetChildEntries(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {selectedEntry && (isLoading || isFetching) ? (
        <div>Loading Child Entries Meta</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <div>Error fetching Child Entries Meta</div>}
        </>
      )}
      <hr />
    </div>
  );
}
