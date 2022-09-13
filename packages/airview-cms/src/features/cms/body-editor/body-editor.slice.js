import { createSlice } from "@reduxjs/toolkit";
import matter from "gray-matter";

const initialState = {
  initialData: null,
  editedData: null,
  initialImagesData: {},
  editedImagesData: {},
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
    setInitialImagesData: (state, action) => {
      state.initialImagesData = {
        ...state.initialImagesData,
        ...action.payload,
      };
    },
    setEditedImagesData: (state, action) => {
      state.editedImagesData = {
        ...state.editedImagesData,
        ...action.payload,
      };
    },
    clearInitialImagesData: (state) => {
      state.initialImagesData = {};
    },
    clearEditedImagesDataData: (state) => {
      state.editedImagesData = {};
    },
  },
});

const {
  setBodyEditorIntialData,
  setBodyEditorEditedData,
  setEditedImagesData,
  clearInitialImagesData,
  clearEditedImagesDataData,
} = bodyEditorSlice.actions;

export { setEditedImagesData };

export const setBodyEditorContent = (data) => {
  return async (dispatch) => {
    const { content: markdownBody } = matter(
      Buffer.from(data.content ?? "", "base64").toString("utf8")
    );

    dispatch(revokeInitialImagesDataObjectURLs());
    dispatch(revokeEditedImagesDataObjectURLs());
    dispatch(setBodyEditorIntialData(markdownBody));
    dispatch(setBodyEditorEditedData(markdownBody));
  };
};

export const persitBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorEditedData(data));
  };
};

const revokeInitialImagesDataObjectURLs = () => {
  return (dispatch, getState) => {
    const { initialImagesData } = getState().bodyEditorSlice;

    Object.values(initialImagesData).forEach((objectURL) => {
      URL.revokeObjectURL(objectURL);
    });

    dispatch(clearInitialImagesData());
  };
};

const revokeEditedImagesDataObjectURLs = () => {
  return (dispatch, getState) => {
    const { editedImagesData } = getState().bodyEditorSlice;

    Object.values(editedImagesData).forEach((objectURL) => {
      URL.revokeObjectURL(objectURL);
    });

    dispatch(clearEditedImagesDataData());
  };
};

export const createObjectURLfromFileData = (file) => {
  return {
    [`${file.name}`]: URL.createObjectURL(file),
  };
};

export const clearBodyEditorEdits = () => {
  return (dispatch, getState) => {
    const { initialData } = getState().bodyEditorSlice;

    dispatch(setBodyEditorEditedData(initialData));
    dispatch(revokeEditedImagesDataObjectURLs());
  };
};

export const selectEditorKey = (state) => state.bodyEditorSlice.editorKey;

export const selectBodyEditorData = (state) => state.bodyEditorSlice.editedData;

export const selectDoesBodyEditorHaveEdits = (state) => {
  const { initialData, editedData } = state.bodyEditorSlice;
  return initialData !== editedData;
};

export const selectInitialImagesData = (state) =>
  state.bodyEditorSlice.initialImagesData;

export const selectEditedImagesData = (state) =>
  state.bodyEditorSlice.editedImagesData;
