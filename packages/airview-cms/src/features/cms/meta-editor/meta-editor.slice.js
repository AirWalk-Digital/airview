import { createSlice } from "@reduxjs/toolkit";
const isEqual = require("lodash/isEqual");

const initialState = {
  metaEditorEnabled: false,
  isIdle: true,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  originalData: {},
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
    setMetaEditorToIsLoading: (state) => {
      state.isIdle = false;
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
      state.originalData = {};
      state.editedData = {};
    },
    setMetaEditorToIsSuccess: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.error = null;
      state.originalData = action.payload;
      state.editedData = action.payload;
    },
    setMetaEditorToIsError: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.error = action.payload;
    },
    persistMetaDataEdit: (state, action) => {
      const { key, data } = action.payload;
      state.editedData[key] = data;
    },
    clearMetaDataEdits: (state) => {
      state.editedData = state.originalData;
    },
  },
});

export const {
  enableMetaEditor,
  disableMetaEditor,
  setMetaEditorToIsLoading,
  setMetaEditorToIsSuccess,
  setMetaEditorToIsError,
  persistMetaDataEdit,
  clearMetaDataEdits,
} = metaEditorSlice.actions;

export const selectMetaEditorEnabledStatus = (state) =>
  state.metaEditorSlice.metaEditorEnabled;

export const selectDoesMetaEditorHaveEdits = (state) => {
  const { originalData, editedData } = state.metaEditorSlice;
  return !isEqual(originalData, editedData);
};

export const selectMetaEditorLoadingStatus = (state) => {
  const { isIdle, isLoading, isSuccess, isError, error } =
    state.metaEditorSlice;

  return {
    isIdle,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const selectMetaEditorData = (state) => {
  return Object.entries(state.metaEditorSlice.editedData);
};
