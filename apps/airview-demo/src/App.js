import React from "react";
import dayjs from "dayjs";
import {
  AirviewCMS,
  useGetEntryMeta,
  useGetAllEntriesMeta,
  useGetSiblingEntriesMeta,
  useGetChildEntriesMeta,
  useGetCollectionEntries,
  useSetCmsContext,
} from "airview-cms";

const config = {
  baseBranch: "main",
  collections: {
    application: {
      label: "Application",
      fields: [],
    },
    knowledge: {
      label: "Knowledge",
      fields: [
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
          required: true,
          //minDate: "2022-05-01T00:00:00Z",
          //maxDate: "2022-05-31T00:00:00Z",
          defaultValue: dayjs().toISOString(),
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
          <p>
            <em>release/security_patch</em>
          </p>
          <CmsContextEntry />
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

function CmsContextEntry() {
  const { data, isLoading, isFetching, isError, error } = useSetCmsContext(
    "release/security_patch"
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
