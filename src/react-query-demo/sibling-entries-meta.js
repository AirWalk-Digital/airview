import React, { useState } from "react";
import { useGetSiblingEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { PrintJson } from "./components";

export function SiblingEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState("");

  const { status, data: entries } = useGetSiblingEntriesMeta(selectedEntry);

  const handleOnChange = (event) => setSelectedEntry(event.target.value);

  return (
    <div>
      <h3>Sibling Entries Meta</h3>
      <p>
        <i>useGetSiblingEntriesMeta(collectionId, entryId)</i>
      </p>

      <EntrySelector onChange={handleOnChange} value={selectedEntry} />

      {status === "loading" ? (
        <div>Loading Sibling Entries Metaa</div>
      ) : (
        <PrintJson data={entries} />
      )}
      <hr />
    </div>
  );
}
