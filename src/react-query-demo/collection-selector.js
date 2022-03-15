import React from "react";
import { useGetCollections } from "./hooks";

export function CollectionSelector({ onChange, value, ...otherProps }) {
  const { status, data: collections } = useGetCollections();

  if (status === "loading") {
    return <div>Loading Collections</div>;
  }

  if (!collections) return <div>No Collections</div>;

  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value="">Choose collection...</option>
      {collections.map((collection) => (
        <option key={collection} value={collection}>
          {collection}
        </option>
      ))}
    </select>
  );
}
