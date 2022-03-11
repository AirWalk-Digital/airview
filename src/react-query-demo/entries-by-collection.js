import React, { useState } from "react";
import { useGetEntriesMetaByCollection } from "./hooks";
import { CollectionSelector } from "./collection-selector";
import { PrintJson } from "./components";

export function EntriesByCollection() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const { status, data: entries } =
    useGetEntriesMetaByCollection(selectedCollection);

  const handleOnChange = (collection) => setSelectedCollection(collection);

  if (status === "loading") {
    return <div>Loading Entries By Collection</div>;
  }

  return (
    <div>
      <h3>Entries By Collection</h3>
      <p>
        <i>useGetEntriesMetaByCollection(collectionId)</i>
      </p>
      <CollectionSelector onChange={handleOnChange} />
      <PrintJson data={entries} />
      <hr />
    </div>
  );
}
