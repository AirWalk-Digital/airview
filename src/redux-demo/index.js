// import { Routes, Route } from "react-router-dom";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  useMemo,
} from "react";
import matter from "gray-matter";
//import { AirviewProvider, entryDataSlice } from "./library";
// import { config } from "./config";
// import { MainLayout, EntryView } from "./demo";
import "./styles.css";

// export function ReduxDemo() {
//   return (
//     <AirviewProvider config={config}>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route path=":collection/:entry" element={<EntryView />} />
//           <Route path="*" element={<span>Entry not found!</span>} />
//         </Route>
//       </Routes>
//     </AirviewProvider>
//   );
// }

// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   fetchBranches,
//   fetchAllEntriesMeta,
//   fetchEntry,
//   setWorkingBranch,
// } from "./library";

// export function ReduxDemo() {
//   return (
//     <AirviewProvider config={config}>
//       <Test />
//     </AirviewProvider>
//   );
// }

export function ReduxDemo() {
  return (
    <AirviewProvider>
      <BranchSwitcher />
      <BranchList />
      <AllEntriesMeta />
      <Entry />
    </AirviewProvider>
  );
}

function AirviewProvider({ children }) {
  const [state, dispatch] = useAirviewStore();

  return (
    <AirviewStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </AirviewStoreContext.Provider>
  );
}

function BranchSwitcher() {
  const { state, dispatch } = useContext(AirviewStoreContext);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "set_working_branch", payload: "one" });
    }, 5000);
  }, [dispatch]);

  console.log("working branch:", state.workingBranch);

  return null;
}

function BranchList() {
  const { isLoading, isFetching, isError, data, error } = useGetBranches();

  if (isLoading) {
    return <p>Loading branches...</p>;
  }

  if (isError && error.name !== "AbortError") {
    return <PrintJson data={{ error: error.message }} />;
  }

  if (data) {
    return (
      <FetchingWrapper fetching={isFetching}>
        <PrintJson data={data} />
      </FetchingWrapper>
    );
  }

  return null;
}

function AllEntriesMeta() {
  const { isLoading, isFetching, isError, data, error } =
    useGetAllEntriesMeta();

  if (isLoading) {
    return <p>Loading all entries meta...</p>;
  }

  if (isError && error.name !== "AbortError") {
    return <PrintJson data={{ error: error.message }} />;
  }

  if (data) {
    return (
      <FetchingWrapper fetching={isFetching}>
        <PrintJson data={data} />
      </FetchingWrapper>
    );
  }

  return null;
}

function Entry() {
  const { isLoading, isFetching, isError, data, error } = useGetEntry(
    "release",
    "security_patch"
  );

  if (isLoading) {
    return <p>Loading entry...</p>;
  }

  if (isError && error.name !== "AbortError") {
    return <PrintJson data={{ error: error.message }} />;
  }

  if (data) {
    return (
      <FetchingWrapper fetching={isFetching}>
        <PrintJson data={data} />
      </FetchingWrapper>
    );
  }

  return null;
}

function FetchingWrapper({ fetching, children }) {
  return <div style={{ opacity: fetching ? 0.5 : 1 }}>{children}</div>;
}

function PrintJson({ data }) {
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

const initialState = {
  workingBranch: "main",
  previewMode: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "set_working_branch":
      console.log("set_working_branch");
      return { ...state, workingBranch: action.payload };
    case "enable_preview_mode":
      console.log("enable_preview_mode");
      return { ...state, previewMode: true };
    case "disable_preview_mode":
      console.log("disable_preview_mode");
      return { ...state, previewMode: false };
    default:
      throw new Error(`Invalid action for: ${action.type}`);
  }
}

function useAirviewStore() {
  return useReducer(reducer, initialState);
}

const AirviewStoreContext = React.createContext();

async function fetchClient(endpoint, options) {
  const response = await fetch(endpoint, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

async function fetchBranches(signal) {
  return await fetchClient("/api/branches", { cache: "no-cache", signal });
}

async function fetchAllEntriesMeta(signal, workingBranch) {
  const branches = await fetchBranches(signal);

  const branchSha = branches.filter(
    (branch) => branch.name === workingBranch
  )[0].sha;

  return await fetchClient(`/api/entries/${workingBranch}?${branchSha}`, {
    cache: "force-cache",
    signal,
  });
}

async function fetchEntry(collection, entry, signal, workingBranch) {
  const entriesMeta = await fetchAllEntriesMeta(signal, workingBranch);

  const entrySha = entriesMeta[`${collection}/${entry}`].sha.join("&");

  return await fetchClient(
    `/api/content/${collection}/${entry}/${workingBranch}?${entrySha}`,
    {
      cache: "force-cache",
      signal,
    }
  );
}

function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}

function useGetBranches() {
  const [state, setState] = useState({
    isIdle: true,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  });

  const { state: storeState } = useContext(AirviewStoreContext);

  useEffect(() => {
    let inFlight = false;
    const controller = new AbortController();

    (async () => {
      try {
        inFlight = true;
        setState((prevState) => ({
          ...prevState,
          isLoading: !prevState.data ? true : false,
          isFetching: prevState.data ? true : false,
          isSuccess: false,
        }));

        const data = await fetchBranches(controller.signal);

        setState((prevState) => ({
          ...prevState,
          isIdle: false,
          isLoading: false,
          isFetching: false,
          isSuccess: true,
          isError: false,
          data,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isFetching: false,
          isSuccess: false,
          isError: true,
          error,
        }));
      } finally {
        inFlight = false;
      }
    })();

    return () => {
      if (inFlight) {
        console.log("aborting useGetBranches");
        controller.abort();
      }
    };
  }, [storeState.workingBranch]);

  return state;
}

function useGetAllEntriesMeta() {
  const [state, setState] = useState({
    isIdle: true,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  });

  const { state: storeState } = useContext(AirviewStoreContext);

  useEffect(() => {
    let inFlight = false;
    const controller = new AbortController();

    (async () => {
      try {
        inFlight = true;
        setState((prevState) => ({
          ...prevState,
          isLoading: !prevState.data ? true : false,
          isFetching: prevState.data ? true : false,
          isSuccess: false,
        }));

        const data = await fetchAllEntriesMeta(
          controller.signal,
          storeState.workingBranch
        );

        setState((prevState) => ({
          ...prevState,
          isIdle: false,
          isLoading: false,
          isFetching: false,
          isSuccess: true,
          isError: false,
          data,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isFetching: false,
          isSuccess: false,
          isError: true,
          error,
        }));
      } finally {
        inFlight = false;
      }
    })();

    return () => {
      if (inFlight) {
        console.log("aborting useGetAllEntriesMeta");
        controller.abort();
      }
    };
  }, [storeState.workingBranch]);

  return state;
}

function useGetEntry(collection, entry) {
  const [state, setState] = useState({
    isIdle: true,
    isLoading: false,
    isFetching: false,
    isSuccess: false,
    isError: false,
    data: null,
    error: null,
  });

  const { state: storeState } = useContext(AirviewStoreContext);

  useEffect(() => {
    let inFlight = false;
    const controller = new AbortController();

    (async () => {
      try {
        inFlight = true;
        setState((prevState) => ({
          ...prevState,
          isLoading: !prevState.data ? true : false,
          isFetching: prevState.data ? true : false,
          isSuccess: false,
        }));

        const data = await fetchEntry(
          collection,
          entry,
          controller.signal,
          storeState.workingBranch
        );

        setState((prevState) => ({
          ...prevState,
          isIdle: false,
          isLoading: false,
          isFetching: false,
          isSuccess: true,
          isError: false,
          data: normalizeEntryData(data),
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isFetching: false,
          isSuccess: false,
          isError: true,
          error,
        }));
      } finally {
        inFlight = false;
      }
    })();

    return () => {
      if (inFlight) {
        console.log("aborting useGetEntry");
        controller.abort();
      }
    };
  }, [storeState.workingBranch, collection, entry]);

  return state;
}
