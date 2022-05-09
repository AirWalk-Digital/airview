import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  metaEditorEnabled: false,
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
  },
});

export const { enableMetaEditor, disableMetaEditor } = metaEditorSlice.actions;

export const selectMetaEditorEnabledStatus = (state) =>
  state.metaEditorSlice.metaEditorEnabled;
