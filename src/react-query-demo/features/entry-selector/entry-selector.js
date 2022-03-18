import React from "react";
import { useGetAllEntriesMeta } from "../../hooks";

export function EntrySelector({ onChange, value = "", ...otherProps }) {
  const { isLoading, isError, isFetching, data } = useGetAllEntriesMeta();

  if (isLoading || isFetching) {
    return <div>Loading Entries</div>;
  }

  if (isError) return <div>Error fetching Entries</div>;

  if (!data) return <div>No Entries</div>;

  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value="">Choose an entry...</option>
      {data.map((entry) => (
        <option key={entry.id} value={entry.id}>
          {entry.name}
        </option>
      ))}
    </select>
  );
}
