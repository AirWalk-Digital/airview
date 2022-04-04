import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetBranchesQuery,
  useLazyGetAllEntriesMetaQuery,
  useLazyGetEntryQuery,
} from "../api";

const set = require("lodash/set");

const initialState = {
  status: "idle",
  error: null,
  id: null,
  originalData: null,
  editsData: null,
};

export const contextSlice = createSlice({
  name: "context",
  initialState,
  reducers: {
    setContextId(state, action) {
      state.id = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setContextData(state, action) {
      state.originalData = action.payload;
      state.editsData = action.payload;
    },
    persistEdits(state, action) {
      const { path, value } = action.payload;

      set(state.editsData, path, value);
    },
    clearEdits(state) {
      state.editsData = state.originalData;
    },
    resetContextState(state) {
      state = initialState;
    },
  },
});

const {
  setStatus,
  setError,
  setContextId,
  setContextData,
  persistEdits,
  clearEdits,
  resetContextState,
} = contextSlice.actions;

export { persistEdits, clearEdits };

export function useGetContext(id) {
  const {
    editsData: data,
    status,
    error,
  } = useSelector((state) => state.context);

  const {
    status: entryQueryStatus,
    data: entryQueryData,
    error: entryQueryError,
  } = useGetEntry(id);

  const dispatch = useDispatch();

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

function useGetAllEntriesMeta(select) {
  const { status: branchQueryStatus, data: branchQueryData } =
    useGetBranchesQuery();

  const [
    trigger,
    { status: metaQueryStatus, data: metaQueryData, error: metaQueryError },
  ] = useLazyGetAllEntriesMetaQuery({
    ...(select && { selectFromResult: select }),
  });

  useEffect(() => {
    if (!branchQueryData) return;

    const branchSha = branchQueryData.filter(
      (branch) => branch.name === "main"
    ).sha;

    const request = trigger({ branch: "main", branchSha });

    return () => {
      request.abort();
    };
  }, [trigger, branchQueryData]);

  return {
    status: metaQueryStatus,
    data: metaQueryData,
    error: metaQueryError,
  };
}

function useGetEntry(entryId) {
  const { data: metaQueryData } = useGetAllEntriesMeta(({ data }) => {
    return { data: data?.[entryId] };
  });

  const branch = "main";

  const [trigger, { status, data, error }] = useLazyGetEntryQuery();

  useEffect(() => {
    if (!metaQueryData || !branch) return;

    const request = trigger({
      entryId,
      branch,
      entrySha: metaQueryData.sha.join("-"),
    });

    return () => request.abort();
  }, [trigger, metaQueryData, branch, entryId]);

  return {
    status,
    data,
    error,
  };
}
