import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialData: null,
  editedData: null,
};

export const bodyEditorSlice = createSlice({
  name: "bodyEditorSlice",
  initialState,
  reducers: {
    setBodyEditorIntialData: (state, action) => {
      state.initialData = action.payload;
    },
    setBodyEditorEditedData: (state, action) => {
      state.editedData = action.payload;
    },
  },
});

const { setBodyEditorIntialData, setBodyEditorEditedData } =
  bodyEditorSlice.actions;

export const setBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorIntialData(data));
    dispatch(setBodyEditorEditedData(data));
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
  };
};

export const selectEditorKey = (state) => state.bodyEditorSlice.editorKey;

export const selectBodyEditorData = (state) => state.bodyEditorSlice.editedData;

export const selectDoesBodyEditorHaveEdits = (state) => {
  const { initialData, editedData } = state.bodyEditorSlice;
  return initialData !== editedData;
};
