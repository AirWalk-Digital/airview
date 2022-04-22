import { createSlice } from "@reduxjs/toolkit";

const set = require("lodash/set");

const initialState = {
  status: "idle",
  error: null,
  id: null,
  originalData: null,
  editsData: null,
};

export const editorContextSlice = createSlice({
  name: "editorContext",
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
      console.log("clearing editor state");
      return { ...initialState };
    },
  },
});

export const {
  setStatus,
  setError,
  setContextId,
  setContextData,
  persistEdits,
  clearEdits,
  resetContextState,
} = editorContextSlice.actions;
