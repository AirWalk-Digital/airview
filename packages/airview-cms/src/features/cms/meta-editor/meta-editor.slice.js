import { createSlice } from "@reduxjs/toolkit";
const isEqual = require("lodash/isEqual");

const initialState = {
  metaEditorEnabled: false,
  initialData: {},
  editedData: {},
};

export const metaEditorSlice = createSlice({
  name: "metaEditorSlice",
  initialState,
  reducers: {
    enableMetaEditor: (state) => {
      state.metaEditorEnabled = true;
    },
    disableMetaEditor: (state) => {
      state.metaEditorEnabled = false;
    },
    setMetaEditorInitialData: (state, action) => {
      state.initialData = action.payload;
      state.editedData = action.payload;
    },
    persistMetaDataEdit: (state, action) => {
      const { key, data } = action.payload;
      state.editedData[key] = data;
    },
    clearMetaDataEdits: (state) => {
      state.editedData = state.initialData;
    },
  },
});

export const {
  enableMetaEditor,
  disableMetaEditor,
  setMetaEditorInitialData,
  persistMetaDataEdit,
  clearMetaDataEdits,
} = metaEditorSlice.actions;

export const selectMetaEditorEnabledStatus = (state) =>
  state.metaEditorSlice.metaEditorEnabled;

export const selectDoesMetaEditorHaveEdits = (state) => {
  const { initialData, editedData } = state.metaEditorSlice;
  return !isEqual(initialData, editedData);
};

export const selectMetaEditorData = (state) => {
  return Object.entries(state.metaEditorSlice.editedData);
};
