import React, { useState } from "react";
import { useGetEntryMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function EntryMeta() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const { status, data: entryMeta } = useGetEntryMeta(selectedEntry);

  const handleOnChange = (entry) => setSelectedEntry(entry);

  return (
    <div>
      <h3>Entry Meta</h3>
      <p>
        <i>useGetEntryMeta(entryId)</i>
      </p>
      <EntrySelector onChange={handleOnChange} />
      {status === "loading" ? (
        <div>Loading entry meta</div>
      ) : (
        <PrintJson data={entryMeta} />
      )}
      <hr />
    </div>
  );
}
