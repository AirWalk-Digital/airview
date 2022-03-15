import React, { useState } from "react";
import { useGetChildEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function ChildEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");

  const { status, data: entries } = useGetChildEntriesMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Child Entries Meta</h3>
      <p>
        <i>useGetChildEntries(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} value={selectedEntry} />
      {status === "loading" ? (
        <div>Loading Child Entries Meta</div>
      ) : (
        <PrintJson data={entries} />
      )}
      <hr />
    </div>
  );
}
