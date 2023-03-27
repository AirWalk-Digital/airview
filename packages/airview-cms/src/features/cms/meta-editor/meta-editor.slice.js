import { createSlice } from "@reduxjs/toolkit";
import matter from "gray-matter";
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
    toggleMetaEditor: (state) => {
      state.metaEditorEnabled = !state.metaEditorEnabled;
    },
    setMetaEditorInitialData: {
      reducer: (state, action) => {
        state.initialData = action.payload;
        state.editedData = action.payload;
      },
      prepare: (entryData) => {
        const { data } = matter(
          Buffer.from(entryData.content ?? "", "base64").toString("utf8")
        );

        return { payload: data };
      },
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
  toggleMetaEditor,
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
  return state.metaEditorSlice.editedData;
};
