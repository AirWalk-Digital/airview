import React, { useState } from "react";
import { useGetSiblingEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function SiblingEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const { status, data: entries } = useGetSiblingEntriesMeta(selectedEntry);

  const handleOnChange = (entry) => setSelectedEntry(entry);

  return (
    <div>
      <h3>Sibling Entries Meta</h3>
      <p>
        <i>useGetSiblingEntriesMeta(collectionId, entryId)</i>
      </p>

      <EntrySelector onChange={handleOnChange} />

      {status === "loading" ? (
        <div>Loading Sibling Entries Metaa</div>
      ) : (
        <PrintJson data={entries} />
      )}
      <hr />
    </div>
  );
}
