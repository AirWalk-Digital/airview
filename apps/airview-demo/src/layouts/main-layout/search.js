import React from "react";
import { Search as PureSearch } from "airview-ui";

function Search({ open, onRequestToClose }) {
  const handleOnQueryChange = async () => [];

  return (
    <PureSearch
      open={open}
      onRequestToClose={() => onRequestToClose()}
      onQueryChange={handleOnQueryChange}
      linkComponent="a"
    />
  );
}

export { Search };
