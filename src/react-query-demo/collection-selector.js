import React, { useRef } from "react";
import { useGetCollections } from "./hooks";

export function CollectionSelector({
  onChange,
  defaultValue = "",
  ...otherProps
}) {
  const { status, data: collections } = useGetCollections();

  const selectedCollection = useRef();

  const handleOnChange = (event) => {
    onChange(selectedCollection.current.value);
    event.preventDefault();
  };

  if (status === "loading") {
    return <div>Loading Collections</div>;
  }

  if (!collections) return <div>No Collections</div>;

  return (
    <select
      defaultValue={defaultValue}
      onChange={handleOnChange}
      ref={selectedCollection}
      {...otherProps}
    >
      <option value="">Choose collection...</option>
      {collections.map((collection) => (
        <option key={collection} value={collection}>
          {collection}
        </option>
      ))}
    </select>
  );
}
