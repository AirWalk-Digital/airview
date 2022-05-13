import React from "react";
import {
  AirviewCMS,
  useGetAllEntriesMeta,
  //useGetEntry,
  useSetCmsContext,
} from "airview-cms";
//import { useState, useEffect, useCallback } from "react";
//import matter from "gray-matter";

const config = {
  baseBranch: "main",
  collections: {
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
          widget: "parent_select",
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
          <Entry />
        </div>
        <div style={{ width: "50%" }}>
          <AllEntriesMeta />
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

function Entry() {
  const { data, isLoading, isFetching, isError, error } = useSetCmsContext(
    "release/security_patch"
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

/*
function Test() {
  const [workingBranch, setWorkingBranch] = useState("main");

  const { state: branchesState, fetchBranches } = useFetchBranches();

  const { state: allEntriesState } = useFetchAllEntriesMeta(
    branchesState.data,
    workingBranch
  );

  const { state: entryState } = useFetchEntry(
    allEntriesState.data,
    "release/security_patch"
  );

  useEffect(() => {
    fetchBranches();
  }, [fetchBranches]);

  useEffect(() => {
    setTimeout(() => {
      console.log("switching branch to 'one'");

      setWorkingBranch("one");
    }, [5000]);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("refetching branches");

      fetchBranches();
    }, [8000]);
  }, [fetchBranches]);

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        console.log("Requesting mutation of entry...");

        const entryData = {
          content: "Mutated Entry Body",
          title: "Mutated Entry Title",
        };

        await fetch(`/api/content/release/security_patch/one`, {
          method: "PUT",
          body: JSON.stringify({
            _index: btoa(
              matter.stringify(entryData.content, { title: entryData.title })
            ),
          }),
        });

        fetchBranches();
      })();
    }, [12000]);
  }, [fetchBranches]);

  // console.log("branches:", branchesState);
  // console.log("allEntries:", allEntriesState);
  // console.log("entry", entryState);

  if (entryState.data) {
    const body = atob(entryState.data.content["_index"]);

    return <div>{body}</div>;
  }

  return null;
}

function useFetchBranches() {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const fetchBranches = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        status: "loading",
        error: null,
      }));

      const response = await fetch("/api/branches");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setState((prevState) => ({
        ...prevState,
        status: "fulfilled",
        data,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        status: "error",
        error: error.message,
      }));
    }
  }, []);

  return {
    state,
    fetchBranches,
  };
}

function useFetchAllEntriesMeta(branches, workingBranch) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const branchSha = branches?.find(
    (branch) => branch.name === workingBranch
  )?.sha;

  const fetchAllEntriesMeta = useCallback(async () => {
    if (!branchSha) return;

    try {
      setState((prevState) => ({
        ...prevState,
        status: "loading",
        error: null,
      }));

      const response = await fetch(`/api/entries/${branchSha}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setState((prevState) => ({
        ...prevState,
        status: "fulfilled",
        data,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        status: "error",
        error: error.message,
      }));
    }
  }, [branchSha]);

  useEffect(() => {
    fetchAllEntriesMeta();
  }, [fetchAllEntriesMeta]);

  return { state };
}

function useFetchEntry(entriesMeta, entryId) {
  const [state, setState] = useState({
    status: "idle",
    data: null,
    error: null,
  });

  const entrySha = entriesMeta?.find((entry) => entry.id === entryId)?.sha;

  const fetchEntry = useCallback(async () => {
    if (!entrySha) return;

    try {
      setState((prevState) => ({
        ...prevState,
        status: "loading",
        error: null,
      }));

      const response = await fetch(`/api/content/${entrySha}`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setState((prevState) => ({
        ...prevState,
        status: "fulfilled",
        data,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        status: "error",
        error: error.message,
      }));
    }
  }, [entrySha]);

  useEffect(() => {
    fetchEntry();
  }, [fetchEntry]);

  return { state };
}
*/
