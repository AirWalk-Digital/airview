import { createSlice } from "@reduxjs/toolkit";
import matter from "gray-matter";
import { MarkdownResolverUtils } from "./markdown-resolver";

const resolveMarkdown = new MarkdownResolverUtils();

const initialState = {
  initialData: null,
  editedData: null,
  imagesData: [],
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
    setImageData: (state, action) => {
      state.imagesData.push(action.payload);
    },
    clearImageData: (state) => {
      state.imagesData = [];
    },
  },
});

const {
  setBodyEditorIntialData,
  setBodyEditorEditedData,
  setImageData,
  clearImageData,
} = bodyEditorSlice.actions;

export { setImageData };

export const setBodyEditorContent = (data) => {
  return async (dispatch) => {
    const { content: markdownBody } = matter(atob(data?.["_index.md"] ?? ""));

    const { resolvedMarkdown, resolvedImages } =
      await resolveMarkdown.resolveInbound(markdownBody, data);

    dispatch(revokeImageDataObjectURLs());
    dispatch(setBodyEditorIntialData(resolvedMarkdown));
    dispatch(setBodyEditorEditedData(resolvedMarkdown));
    dispatch(setImageData(resolvedImages));
  };
};

export const persitBodyEditorContent = (data) => {
  return (dispatch) => {
    dispatch(setBodyEditorEditedData(data));
  };
};

const revokeImageDataObjectURLs = () => {
  return (dispatch, getState) => {
    const { imagesData } = getState().bodyEditorSlice;

    Object.values(imagesData).forEach((objectURL) => {
      URL.revokeObjectURL(objectURL);
    });

    dispatch(clearImageData());
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

    // Should also remove any uploaded images!
    dispatch(setBodyEditorEditedData(initialData));
  };
};

export const selectEditorKey = (state) => state.bodyEditorSlice.editorKey;

export const selectBodyEditorData = (state) => state.bodyEditorSlice.editedData;

export const selectDoesBodyEditorHaveEdits = (state) => {
  const { initialData, editedData } = state.bodyEditorSlice;
  return initialData !== editedData;
};
