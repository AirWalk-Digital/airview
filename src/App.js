import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function client(endpoint) {
  return async () => {
    const response = await fetch(endpoint);

    const data = await response.json();

    return data;
  };
}

function useGetAllEntriesMeta() {
  const { status, data, error } = useQuery(
    "entries_meta",
    client("/api/entries/meta")
  );

  if (data) {
    return {
      status: "success",
      data,
    };
  }

  if (status === "error") {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "loading",
  };
}

function useGetEntriesByCollectionId(collectionId) {
  const {
    status,
    data: entries,
    error,
  } = useQuery("entries_meta", client("/api/entries/meta"));

  if (entries) {
    return {
      status: "success",
      data: entries.filter((entry) => entry.collection === collectionId),
    };
  }

  if (status === "error") {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "loading",
  };
}

function useGetChildEntries(entryId) {
  const {
    status,
    data: entries,
    error,
  } = useQuery("entries_meta", client("/api/entries/meta"));

  if (entries) {
    return {
      status: "success",
      data: entries.filter((entry) => entry.parent === entryId),
    };
  }

  if (status === "error") {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "loading",
  };
}

function useGetSiblingEntries(parentId, collectionId) {
  const {
    status,
    data: entries,
    error,
  } = useQuery("entries_meta", client("/api/entries/meta"));

  if (entries) {
    return {
      status: "success",
      data: entries.filter(
        (entry) =>
          entry.collection === collectionId && entry.parent === parentId
      ),
    };
  }

  if (status === "error") {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "loading",
  };
}

function useGetEntryBodyById(entryId) {
  const {
    status,
    data: entry,
    error,
  } = useQuery(["entryBody", entryId], client(`/api/entries/${entryId}/body`));

  if (entry) {
    return {
      status: "success",
      data: entry,
    };
  }

  if (status === "error") {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "loading",
  };
}

function PrintJson({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function AllEntriesMeta() {
  const { status, data } = useGetAllEntriesMeta();

  if (status === "loading") {
    return <div>Loading: All Entries Meta</div>;
  }

  return (
    <div>
      <h3>All Entries Meta</h3>
      <p>
        <i>useGetAllEntriesMeta()</i>
      </p>
      <PrintJson data={data} />
      <hr />
    </div>
  );
}

function SelectEntryByCollectionId() {
  const collections = [
    {
      id: "application",
      name: "Application",
    },
    {
      id: "knowledge",
      name: "Knowledge",
    },
  ];
  const [collection, setCollection] = useState(collections[0].id);
  const { status, data } = useGetEntriesByCollectionId(collection);

  const handleOnChange = (event) => setCollection(event.target.value);

  if (status === "loading") {
    return <div>Loading: Entries By Collection ID</div>;
  }

  return (
    <div>
      <h3>Entries By Collection ID: {collection}</h3>
      <p>
        <i>useGetEntriesByCollectionId(id)</i>
      </p>
      <select value={collection} onChange={handleOnChange}>
        {collections.map((collection) => (
          <option key={collection.id} value={collection.id}>
            {collection.name}
          </option>
        ))}
      </select>
      <PrintJson data={data} />
      <hr />
    </div>
  );
}

function SelectEntryBodyById() {
  const [entryId, setEntryId] = useState();

  const { status: entriesMetaStatus, data: entriesMeta } =
    useGetAllEntriesMeta();

  const handleOnChange = (event) => setEntryId(event.target.value);

  if (entriesMetaStatus === "loading") {
    return <div>Loading: Entry Body By ID</div>;
  }

  return (
    <div>
      <h3>Entry Body By ID</h3>
      <p>
        <i>useGetAllEntriesMeta()</i>
        <br />
        <i>useGetEntryBodyById(entryId)</i>
      </p>
      <select defaultValue={entriesMeta[0].id} onChange={handleOnChange}>
        {entriesMeta.map((entryMeta) => (
          <option key={entryMeta.id} value={entryMeta.id}>
            {entryMeta.name}
          </option>
        ))}
      </select>
      <EntryBody entryId={entryId ?? entriesMeta[0].id} />
      <hr />
    </div>
  );
}

function EntryBody({ entryId }) {
  const { status, data: entry } = useGetEntryBodyById(entryId);

  if (status === "loading") {
    return <div>Loading entry body for ID: {entryId}</div>;
  }

  return <PrintJson data={entry} />;
}

function ChildEntriesOf() {
  const [entryId, setEntryId] = useState();

  const { status: entriesMetaStatus, data: entriesMeta } =
    useGetAllEntriesMeta();

  const handleOnChange = (event) => setEntryId(event.target.value);

  if (entriesMetaStatus === "loading") {
    return <div>Loading: Get Child Entries</div>;
  }

  return (
    <div>
      <h3>Child Entries of: {entryId ?? entriesMeta[0].id}</h3>
      <p>
        <i>useGetEntryBodyById()</i>
        <br />
        <i>useGetChildEntries(entryId)</i>
        <br />
        <b>Causing hook to re-fetch (/api/entries/meta). Why?</b>
      </p>
      <select defaultValue={entriesMeta[0].id} onChange={handleOnChange}>
        {entriesMeta.map((entryMeta) => (
          <option key={entryMeta.id} value={entryMeta.id}>
            {entryMeta.name}
          </option>
        ))}
      </select>
      <ChildOfEntryBody entryId={entryId ?? entriesMeta[0].id} />
      <hr />
    </div>
  );
}

function ChildOfEntryBody({ entryId }) {
  const { status, data } = useGetChildEntries(entryId);

  if (status === "loading") {
    return <div>Loading child entries for: {entryId}</div>;
  }

  return <PrintJson data={data} />;
}

function App() {
  const [mounted, setMounted] = useState(true);

  const handleOnClick = () => {
    setMounted((prevState) => !prevState);
  };

  return (
    <div style={{ padding: 16 }}>
      <button onClick={handleOnClick}>{mounted ? "Un-mount" : "Mount"}</button>
      {mounted && (
        <>
          <AllEntriesMeta />
          <SelectEntryByCollectionId />
          <ChildEntriesOf />
          <SelectEntryBodyById />
        </>
      )}
    </div>
  );
  /*
  const [entryBody, setEntryBody] = useState();
  const [entriesMeta, setEntriesMeta] = useState();

  useEffect(() => {
    (async () => {
      const response = await client("/api/entries/meta");
      setEntriesMeta(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await client(
        "/api/entries/composing_a_new_message/body"
      );
      setEntryBody(response);
    })();
  }, []);

  console.log("entries meta", entriesMeta);
  console.log("entryBody", entryBody);

  return (
    <div>
      <h3>Entries Meta:</h3>
      <i>/api/entries/meta</i>
      <PrintJson data={entriesMeta} />
      <hr />

      <h3>Entry Body:</h3>
      <i>/api/entries/:entryId/body</i>
      <PrintJson data={entryBody} />
      <hr />
    </div>
  );
  */
}

export default App;
