import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetEntryQuery } from "../api";

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

  const dispatch = useDispatch();

  const [trigger, { status: queryStatus, data: queryData, error: queryError }] =
    useLazyGetEntryQuery();

  useEffect(() => {
    if (!id) return;

    const request = trigger({ id, branch: "main" });
    dispatch(setContextId(id));

    return () => {
      request.abort();
      dispatch(resetContextState());
      // -> {name: 'AbortError', message: 'Aborted'}
    };
  }, [dispatch, id, trigger]);

  useEffect(() => {
    dispatch(setStatus(queryStatus));
  }, [dispatch, queryStatus]);

  useEffect(() => {
    dispatch(setError(queryError));
  }, [dispatch, queryError]);

  useEffect(() => {
    dispatch(setContextData(queryData));
  }, [dispatch, queryData]);

  return { data, status, error };
}
