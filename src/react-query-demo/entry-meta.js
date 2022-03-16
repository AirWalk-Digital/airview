import React, { useState } from "react";
import { useGetEntryMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function EntryMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");
  const { isLoading, isFetching, isSuccess, isError, data } =
    useGetEntryMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Entry Meta</h3>
      <p>
        <i>useGetEntryMeta(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {selectedEntry && (isLoading || isFetching) ? (
        <div>Loading entry meta</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <div>Error fetching entry meta</div>}
        </>
      )}
      <hr />
    </div>
  );
}
