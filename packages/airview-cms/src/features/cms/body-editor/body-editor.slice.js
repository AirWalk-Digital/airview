import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
//const isEqual = require("lodash/isEqual");

const initialState = {
  editorKey: null,
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
    setBodyEditorEditedData: (state, action) => {
      state.editedData = action.payload;
    },
  },
});

const { setEditorKey, setBodyEditorIntialData, setBodyEditorEditedData } =
  bodyEditorSlice.actions;

export const setBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorIntialData(data));
    dispatch(setBodyEditorEditedData(data));
    dispatch(setEditorKey());
  };
};

export const persitBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorEditedData(data));
  };
};

export const clearBodyEditorEdits = () => {
  return (dispatch, getState) => {
    const { initialData } = getState().bodyEditorSlice;

    dispatch(setBodyEditorEditedData(initialData));
    dispatch(setEditorKey());
  };
};

export const selectEditorKey = (state) => state.bodyEditorSlice.editorKey;

export const selectBodyEditorData = (state) =>
  state.bodyEditorSlice.initialData;

export const selectDoesBodyEditorHaveEdits = (state) => {
  const { initialData, editedData } = state.bodyEditorSlice;
  return initialData !== editedData;
};
