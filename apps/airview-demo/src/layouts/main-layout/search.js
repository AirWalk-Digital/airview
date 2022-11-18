import React from "react";
import { Search as PureSearch } from "airview-ui";
import { Link as ReactRouterLink } from "react-router-dom";

function Search({ open, onRequestToClose }) {
  const handleOnQueryChange = async () => [];

  return (
    <PureSearch
      open={open}
      onRequestToClose={() => onRequestToClose()}
      onQueryChange={handleOnQueryChange}
      linkComponent={ReactRouterLink}
    />
  );
}

export { Search };
