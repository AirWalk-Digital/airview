import React from "react";
import { useGetCollections } from "../../hooks";

export function CollectionSelector({ onChange, value = "", ...otherProps }) {
  const collections = useGetCollections();

  if (!collections) return <div>No Collections</div>;

  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value="">Choose collection...</option>
      {collections.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}
