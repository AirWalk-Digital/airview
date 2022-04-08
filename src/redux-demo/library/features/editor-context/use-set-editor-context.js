import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { airviewApi } from "../airview-api";
import {
  setContextId,
  setStatus,
  setError,
  setContextData,
  resetContextState,
} from "./editor-context-slice";
import { useGetEntry } from "../entry";
import { useGetBranchesQuery } from "../branching";
import { useGetAllEntriesMetaQuery } from "../entries-meta/entries-meta-api";
import { useGetEntryQuery } from "../entry/entry-api";

const every = require("lodash/every");

export function useSetEditorContext(id) {
  const dispatch = useDispatch();

  const {
    editsData: data,
    status,
    error,
  } = useSelector((state) => state.editorContext);

  useEffect(() => {
    dispatch(resetContextState());
  }, [dispatch, id]);

  useEffect(() => {
    return () => dispatch(resetContextState());
  }, [dispatch]);

  const {
    status: entryQueryStatus,
    data: entryQueryData,
    error: entryQueryError,
  } = useGetEntry(id);

  useEffect(() => {
    dispatch(setContextId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (!entryQueryStatus) return;
    dispatch(setStatus(entryQueryStatus));
  }, [dispatch, entryQueryStatus]);

  useEffect(() => {
    if (!entryQueryError) return;
    dispatch(setError(entryQueryError));
  }, [dispatch, entryQueryError]);

  useEffect(() => {
    if (!entryQueryData) return;
    dispatch(setContextData(entryQueryData));
  }, [dispatch, entryQueryData]);

  return { data, status, error };
}

// export function useTest(id, workingBranch) {
//   // What if this request fails (e.g network error)
//   const { currentData: branches } = useGetBranchesQuery();

//   console.log("branches", branches);

//   // What if the returned branch list no longer contains the working branch client side (e.g, it's been deleted upstream)
//   const branchSha = branches?.filter(
//     (branch) => branch.name === workingBranch
//   )[0]?.sha;

//   const entryMetaData = {};

//   const { currentData: entryMeta } = useGetAllEntriesMetaQuery(
//     {
//       branch: workingBranch,
//       branchSha,
//     },
//     {
//       skip: !every([id, workingBranch]),
//       selectFromResult: ({ currentData }) => ({
//         currentData: currentData?.[id] ?? entryMetaData,
//       }),
//     }
//   );

//   const entrySha = entryMeta?.sha;

//   const request = useGetEntryQuery(
//     { entryId: id, branchSha: branchSha },
//     {
//       skip: !every([id, branchSha]),
//     }
//   );

//   return request;
// }

export function useTest(id, workingBranch) {
  const branchesReq = useGetBranchesQuery();

  const branchSha = branchesReq.currentData?.filter(
    (branch) => branch.name === workingBranch
  )[0]?.sha;

  const entryMetaData = {};

  const allEntriesMetaReq = useGetAllEntriesMetaQuery(
    {
      branch: workingBranch,
      branchSha,
    },
    {
      skip: !every([id, workingBranch, branchesReq.isSuccess]),
      selectFromResult: ({ currentData, ...rest }) => ({
        ...rest,
        currentData: currentData?.[id] ?? entryMetaData,
      }),
    }
  );

  const entrySha = allEntriesMetaReq.currentData?.sha;

  const request = useGetEntryQuery(
    { entryId: id, branch: workingBranch, entrySha },
    {
      skip: !every([id, branchSha, allEntriesMetaReq.isSuccess]),
    }
  );

  return request;
}

// const initialState = {
//   isUnit: true,
//   isLoading: false,
//   isFetching: false,
//   isSuccess: false,
//   isError: false,
//   error: null,
//   data: null,
// };

// function AirviewFetchError(message) {
//   this.name = "AirviewFetchError";
//   this.code = 400;
//   this.message = message;
// }

// export function useTestOld(id, workingBranch) {
//   const dispatch = useDispatch();
//   const [state, setState] = useState(initialState);

//   useEffect(() => {
//     if (!id || !workingBranch) return;

//     let fetchBranches, fetchAllEntriesMeta, fetchEntry;

//     (async () => {
//       try {
//         setState((prevState) => ({
//           ...prevState,
//           isIdle: false,
//           isLoading: prevState.data ? false : true,
//           isFetching: prevState.data ? true : false,
//           isSuccess: false,
//         }));

//         fetchBranches = dispatch(airviewApi.endpoints.getBranches.initiate());

//         const branches = await fetchBranches.unwrap();

//         const branchSha = branches.filter(
//           (branch) => branch.name === workingBranch
//         )[0]?.sha;

//         if (!branchSha)
//           throw new AirviewFetchError(`Branch ${workingBranch} not found`);

//         fetchAllEntriesMeta = dispatch(
//           airviewApi.endpoints.getAllEntriesMeta.initiate({
//             branch: workingBranch,
//             branchSha,
//           })
//         );

//         const allEntriesMeta = await fetchAllEntriesMeta.unwrap();

//         const entrySha = allEntriesMeta[id]?.sha;

//         if (!entrySha)
//           throw new AirviewFetchError(
//             `Entry ${id} not found on branch ${workingBranch}`
//           );

//         fetchEntry = dispatch(
//           airviewApi.endpoints.getEntry.initiate({
//             entryId: id,
//             branch: workingBranch,
//             entrySha,
//           })
//         );

//         const entry = await fetchEntry.unwrap();

//         setState((prevState) => ({
//           ...prevState,
//           isLoading: false,
//           isFetching: false,
//           isSuccess: true,
//           isError: false,
//           error: null,
//           data: entry,
//         }));
//       } catch (error) {
//         console.log(error);

//         setState((prevState) => ({
//           ...prevState,
//           isLoading: false,
//           isFetching: false,
//           isSuccess: false,
//           isError: true,
//           error: error,
//         }));
//       } finally {
//         if (fetchBranches) {
//           fetchBranches.unsubscribe();
//         }

//         if (fetchAllEntriesMeta) {
//           fetchAllEntriesMeta.unsubscribe();
//         }

//         if (fetchEntry) {
//           fetchEntry.unsubscribe();
//         }
//       }
//     })();

//     return () => {
//       console.log("do abort");
//       if (fetchBranches) {
//         fetchBranches.abort("fetchBranches request cancelled");
//       }

//       if (fetchAllEntriesMeta) {
//         fetchAllEntriesMeta.abort("fetchAllEntriesMeta request cancelled");
//       }

//       if (fetchEntry) {
//         fetchEntry.abort("fetchEntry request cancelled");
//       }
//     };
//   }, [dispatch, id, workingBranch]);

//   return state;
// }
