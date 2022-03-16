import React, { useState } from "react";
import { useGetSiblingEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function SiblingEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");

  const { isLoading, isFetching, isSuccess, isError, data } =
    useGetSiblingEntriesMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Sibling Entries Meta</h3>
      <p>
        <i>useGetSiblingEntriesMeta(collectionId, entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {selectedEntry && (isLoading || isFetching) ? (
        <div>Loading Sibling Entries Meta</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <div>Error fetching Sibling Entries Meta</div>}
        </>
      )}
      <hr />
    </div>
  );
}
