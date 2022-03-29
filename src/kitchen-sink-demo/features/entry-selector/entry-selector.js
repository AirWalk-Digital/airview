import React from "react";
import { useGetAllEntriesMeta } from "../../../lib";

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
      {Object.entries(data).map(([entryId, entryData]) => (
        <option key={entryId} value={entryId}>
          {entryData.meta.title}
        </option>
      ))}
    </select>
  );
}
