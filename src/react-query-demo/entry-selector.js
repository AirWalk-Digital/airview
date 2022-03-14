import React, { useRef } from "react";
import { useGetAllEntriesMeta } from "./hooks";

export function EntrySelector({ onChange, defaultValue = "", ...otherProps }) {
  const { status, data: entries } = useGetAllEntriesMeta();

  const selectedEntry = useRef();

  const handleOnChange = (event) => {
    onChange(selectedEntry.current.value);
    event.preventDefault();
  };

  if (status === "loading") {
    return <div>Loading Entries</div>;
  }

  if (!entries) return <div>No Entries</div>;

  return (
    <select
      defaultValue={defaultValue}
      onChange={handleOnChange}
      ref={selectedEntry}
      {...otherProps}
    >
      <option value="">Choose an entry...</option>
      {entries.map((entry) => (
        <option key={entry.id} value={entry.id}>
          {entry.name}
        </option>
      ))}
    </select>
  );
}
