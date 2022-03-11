import React, { useState } from "react";
import { useGetSiblingEntriesMeta } from "./hooks";
import { EntrySelector } from "./entry-selector";
import { CollectionSelector } from "./collection-selector";
import { PrintJson } from "./components";

export function SiblingEntriesMeta() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const { status, data: entries } = useGetSiblingEntriesMeta(
    selectedCollection,
    selectedEntry
  );

  const handleOnChange = (entry) => setSelectedEntry(entry);
  const handleOnCollectionChange = (collection) =>
    setSelectedCollection(collection);

  return (
    <div>
      <h3>Sibling Entries Meta</h3>
      <p>
        <i>useGetSiblingEntriesMeta(collectionId, entryId)</i>
      </p>

      <CollectionSelector onChange={handleOnCollectionChange} />
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
