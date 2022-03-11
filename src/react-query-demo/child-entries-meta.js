import React, { useState } from "react";
import { useGetChildEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function ChildEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { status, data: entries } = useGetChildEntriesMeta(selectedEntry);

  const handleOnChange = (entry) => setSelectedEntry(entry);

  if (status === "loading") {
    return <div>Loading Child Entries</div>;
  }

  return (
    <div>
      <h3>Child Entries</h3>
      <p>
        <i>useGetChildEntries(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} />
      <PrintJson data={entries} />
      <hr />
    </div>
  );
}
