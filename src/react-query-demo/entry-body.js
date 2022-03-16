import React, { useState } from "react";
import { useGetEntryBody } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function EntryBody() {
  const [selectedEntry, setSelectedEntry] = useState("");
  const { isLoading, isFetching, isSuccess, isError, data } =
    useGetEntryBody(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Entry Body</h3>
      <p>
        <i>useGetEntryBody(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {selectedEntry && (isLoading || isFetching) ? (
        <div>Loading entry body</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <div>Error fetching entry body</div>}
        </>
      )}
      <hr />
    </div>
  );
}
