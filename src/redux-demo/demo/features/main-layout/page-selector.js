import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllEntriesMeta } from "../../../library";

export function PageSelector() {
  const navigate = useNavigate();

  const { collection = "", entry = "" } = useParams();

  const { data, isLoading, isError } = useGetAllEntriesMeta();

  const selectValue = !collection || !entry ? "" : `${collection}/${entry}`;

  const handleOnChange = (event) => {
    event.preventDefault();
    navigate(event.target.value, { replace: true });
  };

  if (isError) return <div>Error fetching Entries</div>;

  if (isLoading) {
    return <div>Loading Entries</div>;
  }

  if (!data) return <div>No Entries</div>;

  return (
    <select value={selectValue} onChange={handleOnChange}>
      <option value="/">Choose an entry...</option>
      {Object.entries(data).map(([entryId, entryData]) => (
        <option key={entryId} value={entryId}>
          {entryData.meta.title}
        </option>
      ))}
    </select>
  );
}
