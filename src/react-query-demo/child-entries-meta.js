import React, { useState } from "react";
import { useGetChildEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function ChildEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { status, data: entries } = useGetChildEntriesMeta(selectedEntry);

  const handleOnChange = (entry) => setSelectedEntry(entry);

  return (
    <div>
      <h3>Child Entries Meta</h3>
      <p>
        <i>useGetChildEntries(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} />
      {status === "loading" ? (
        <div>Loading Child Entries Meta</div>
      ) : (
        <PrintJson data={entries} />
      )}
      <hr />
    </div>
  );
}
