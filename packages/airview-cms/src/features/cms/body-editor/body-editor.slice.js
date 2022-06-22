import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
//const isEqual = require("lodash/isEqual");

const initialState = {
  editorKey: nanoid(),
  initialData: null,
  editedData: null,
};

export const bodyEditorSlice = createSlice({
  name: "bodyEditorSlice",
  initialState,
  reducers: {
    setEditorKey: {
      reducer: (state, action) => {
        state.editorKey = action.payload;
      },
      prepare: () => ({ payload: nanoid() }),
    },
    setBodyEditorIntialData: (state, action) => {
      state.initialData = action.payload;
    },
    persitBodyEditorEdit: (state, action) => {
      state.editedData = action.payload;
    },
    clearBodyEditorEdits: (state) => {
      state.editedData = null;
    },
  },
});

const {
  //setEditorKey,
  setBodyEditorIntialData,
  //persitBodyEditorEdit,
  clearBodyEditorEdits,
} = bodyEditorSlice.actions;

export const setBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorIntialData(data));
    dispatch(clearBodyEditorEdits());
  };
};

export const selectBodyEditorData = (state) =>
  state.bodyEditorSlice.initialData;
