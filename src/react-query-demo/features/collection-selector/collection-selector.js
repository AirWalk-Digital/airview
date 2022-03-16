import React from "react";
import { useGetCollections } from "../../hooks";

export function CollectionSelector({ onChange, value = "", ...otherProps }) {
  const { isLoading, isError, isFetching, data } = useGetCollections();

  if (isLoading || isFetching) {
    return <div>Loading Collections</div>;
  }

  if (isError) return <div>Error fetching Collections</div>;

  if (!data) return <div>No Collections</div>;

  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value="">Choose collection...</option>
      {data.map((collection) => (
        <option key={collection} value={collection}>
          {collection}
        </option>
      ))}
    </select>
  );
}
