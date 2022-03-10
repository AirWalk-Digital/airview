import { useEffect, useState } from "react";

async function client(endpoint) {
  const response = await fetch(endpoint);

  const data = await response.json();

  return data;
}

function PrintJson({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

function App() {
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
}

export default App;
