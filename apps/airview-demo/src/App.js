import React from "react";

import {
  AirviewCMS,
  useGetEntry,
  useGetEntryMeta,
  useGetAllEntriesMeta,
  useGetSiblingEntriesMeta,
  useGetChildEntriesMeta,
  useGetCollectionEntries,
  useSetCmsContext,
} from "airview-cms";
import { config } from "./config";
import { CmsContextEntry } from "./features";

function App() {
  return (
    <AirviewCMS config={config}>
      <div style={{ display: "flex", padding: "16px" }}>
        <div style={{ width: "50%" }}>
          <h2>CMS Context Entry</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <CmsContextEntry />
          <hr />
          <h2>Static Entry</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <StaticEntry />
        </div>
        <div style={{ width: "50%" }}>
          <h2>All Entries Meta</h2>
          <AllEntriesMeta />
          <hr />
          <h2>Child Entries Meta</h2>
          <p>
            <em>application/ms_teams</em>
          </p>
          <ChildEntriesMeta />
          <hr />
          <h2>Sibling Entries Meta</h2>
          <p>
            <em>knowledge/composing_a_new_message</em>
          </p>
          <SiblingEntries />
          <hr />
          <h2>Collection Entries Meta</h2>
          <p>
            <em>knowledge</em>
          </p>
          <CollectionEntries />
          <hr />
          <h2>Single Entry Meta</h2>
          <p>
            <em>knowledge/place_call_on_hold</em>
          </p>
          <SingleEntryMeta />
        </div>
      </div>
    </AirviewCMS>
  );
}

export default App;

function AllEntriesMeta() {
  const { data, isLoading, isFetching, isError } = useGetAllEntriesMeta();

  if (isLoading || isFetching) return <div>Fetching all entries meta...</div>;

  if (isError) return <div>Error fetching all entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function ChildEntriesMeta() {
  const { data, isLoading, isFetching, isError } = useGetChildEntriesMeta(
    "application/ms_teams"
  );

  if (isLoading || isFetching) return <div>Fetching child entries meta...</div>;

  if (isError) return <div>Error fetching child entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function SiblingEntries() {
  const { data, isLoading, isFetching, isError } = useGetSiblingEntriesMeta(
    "knowledge/composing_a_new_message"
  );

  if (isLoading || isFetching)
    return <div>Fetching sibling entries meta...</div>;

  if (isError) return <div>Error fetching sibling entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function CollectionEntries() {
  const { data, isLoading, isFetching, isError } =
    useGetCollectionEntries("knowledge");

  if (isLoading || isFetching)
    return <div>Fetching collection entries meta...</div>;

  if (isError) return <div>Error fetching collection entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function SingleEntryMeta() {
  const { data, isLoading, isFetching, isError, error } = useGetEntryMeta(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching entry meta...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching entry meta</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function StaticEntry() {
  const { data, isLoading, isFetching, isError, error } = useGetEntry(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching static entry...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching static entry</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
