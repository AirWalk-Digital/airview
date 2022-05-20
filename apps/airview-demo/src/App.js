import React from "react";
import {
  AirviewCMS,
  useGetEntryMeta,
  useGetAllEntriesMeta,
  useGetSiblingEntriesMeta,
  useSetCmsContext,
} from "airview-cms";

const config = {
  baseBranch: "main",
  collections: {
    application: {
      label: "Application",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          required: true,
          placeholder: "Enter a title for the document",
        },
      ],
    },
    knowledge: {
      label: "Knowledge",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          required: true,
          placeholder: "Enter a title for the document",
        },
        {
          label: "Parent Entry",
          name: "parent",
          widget: "entrySelect",
          excludeSelf: true,
          collection: "application",
          required: true,
        },
      ],
    },
    release: {
      label: "Release",
      fields: [
        {
          label: "Title",
          name: "title",
          widget: "string",
          required: true,
          placeholder: "Enter a title for the document",
        },
        {
          label: "Parent Entry",
          name: "parent",
          widget: "entrySelect",
          excludeSelf: true,
          collection: "application",
          required: true,
        },
        {
          label: "Publish Date",
          name: "publish_date",
          widget: "date",
          //required: true,
          minDate: "2022-05-01T00:00:00Z",
          maxDate: "2022-05-31T00:00:00Z",
          //defaultValue: "2022-01-02",
          //format: "DD/MM/YY",
        },
        {
          label: "User Facing",
          name: "user_facing",
          defaultValue: false,
          widget: "boolean",
        },
      ],
    },
  },
};

function App() {
  return (
    <AirviewCMS config={config}>
      <div style={{ display: "flex", padding: "16px" }}>
        <div style={{ width: "50%" }}>
          <h2>CMS Context Entry</h2>
          <Entry />
        </div>
        <div style={{ width: "50%" }}>
          <h2>All Entries Meta</h2>
          <AllEntriesMeta />
          <hr />
          <h2>Sibling Entries Meta</h2>
          <SiblingEntries />
          <hr />
          <h2>Single Entry Meta</h2>
          <EntryMeta />
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

function SiblingEntries() {
  const { data, isLoading, isFetching, isError } = useGetSiblingEntriesMeta(
    "knowledge/composing_a_new_message"
  );

  if (isLoading || isFetching)
    return <div>Fetching sibling entries meta...</div>;

  if (isError) return <div>Error fetching sibling entries meta</div>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function EntryMeta() {
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

function Entry() {
  const { data, isLoading, isFetching, isError, error } = useSetCmsContext(
    "knowledge/place_call_on_hold"
  );

  if (isLoading || isFetching) return <div>Fetching entry...</div>;

  if (isError)
    return (
      <React.Fragment>
        <div>Error fetching entry</div>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    );

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
