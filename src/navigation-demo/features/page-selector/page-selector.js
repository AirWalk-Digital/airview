import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllEntriesMeta } from "../../../lib";

export function PageSelector() {
  const navigate = useNavigate();
  const { collectionId = "", entryId = "" } = useParams();
  const { isLoading, isError, isFetching, data } = useGetAllEntriesMeta();
  const selectValue =
    !collectionId || !entryId ? "" : `${collectionId}/${entryId}`;

  const handleOnChange = (event) => {
    event.preventDefault();
    navigate(event.target.value, { replace: true });
  };

  if (isLoading || isFetching) {
    return <div>Loading Entries</div>;
  }

  if (isError) return <div>Error fetching Entries</div>;

  if (!data) return <div>No Entries</div>;

  return (
    <select value={selectValue} onChange={handleOnChange}>
      <option value="/navigation-demo">Choose an entry...</option>
      {Object.entries(data).map(([entryId, entryData]) => (
        <option key={entryId} value={entryId}>
          {entryData.meta.title}
        </option>
      ))}
    </select>
  );
}
