import React, { useState } from "react";
import { useGetEntryMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function EntryMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");
  const { status, data: entryMeta } = useGetEntryMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Entry Meta</h3>
      <p>
        <i>useGetEntryMeta(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {status === "loading" ? (
        <div>Loading entry meta</div>
      ) : (
        <PrintJson data={entryMeta} />
      )}
      <hr />
    </div>
  );
}
