import React from "react";
import { useSetCmsContext } from "airview-cms";

export function CmsContextEntry() {
  const { data, isLoading, isFetching, isError, error } = useSetCmsContext(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching CMS context entry...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching CMS context entry</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
