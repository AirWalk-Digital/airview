import React, { useState } from "react";
import { useGetEntriesMetaByCollection } from "../../../lib";
import { CollectionSelector } from "../collection-selector";
import { PrintJson } from "../../components";

export function EntriesByCollection() {
  const [selectedCollection, setSelectedCollection] = useState("");
  const { isLoading, isFetching, isSuccess, isError, data } =
    useGetEntriesMetaByCollection(selectedCollection);

  const handleOnChange = (event) => {
    setSelectedCollection(event.target.value);
  };

  return (
    <div>
      <h3>Entries By Collection</h3>
      <p>
        <i>useGetEntriesMetaByCollection(collectionId)</i>
      </p>
      <CollectionSelector
        onChange={handleOnChange}
        value={selectedCollection}
      />
      {selectedCollection && (isLoading || isFetching) ? (
        <div>Loading all entries by collection</div>
      ) : (
        <>
          {isSuccess && <PrintJson data={data} />}
          {isError && <div>Error fetching entries data</div>}
        </>
      )}
      <hr />
    </div>
  );
}
