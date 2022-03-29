import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EntrySelector } from "../entry-selector";

export function PageSelector() {
  const navigate = useNavigate();
  const { collectionId = "", entryId = "" } = useParams();

  const handleOnChange = (event) => {
    event.preventDefault();
    navigate(event.target.value, { replace: true });
  };

  const value = !collectionId || !entryId ? "" : `${collectionId}/${entryId}`;

  return <EntrySelector value={value} onChange={handleOnChange} />;
}
