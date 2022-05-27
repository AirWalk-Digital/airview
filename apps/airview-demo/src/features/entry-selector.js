import React from "react";
import { useGetAllEntriesMeta } from "airview-cms";

export function EntrySelector({ value, onChange }) {
  const {
    isLoading,
    isFetching,
    isSuccess,
    isError,
    data: entries,
  } = useGetAllEntriesMeta();

  const handleOnChange = (event) => {
    event.preventDefault();
    onChange(event.target.value);
  };

  if (isLoading) {
    return <div>Loading entires selection</div>;
  }

  if (isError) {
    return <div>Error loading entries selection</div>;
  }

  if (isSuccess && (!entries || !entries.length)) return <div>No entries</div>;

  if (entries)
    return (
      <select value={value} onChange={handleOnChange} disabled={isFetching}>
        <option value="">Choose an entry</option>
        {entries.map((entry) => (
          <option value={entry.id} key={entry.id}>
            {entry.meta.title}
          </option>
        ))}
      </select>
    );
}
