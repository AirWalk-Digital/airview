import React from "react";
import { useGetAllEntriesMeta } from "./hooks";

export function EntrySelector({ onChange, value, ...otherProps }) {
  const { status, data: entries } = useGetAllEntriesMeta();

  if (status === "loading") {
    return <div>Loading Entries</div>;
  }

  if (!entries) return <div>No Entries</div>;

  return (
    <select value={value} onChange={onChange} {...otherProps}>
      <option value="">Choose an entry...</option>
      {entries.map((entry) => (
        <option key={entry.id} value={entry.id}>
          {entry.name}
        </option>
      ))}
    </select>
  );
}
