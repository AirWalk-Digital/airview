import { configureStore } from "@reduxjs/toolkit";
import { branchManagerSlice } from "../branching";
import { editorContextSlice } from "../editor-context";
import { airviewApi } from "../airview-api";

export const airviewStore = configureStore({
  reducer: {
    [airviewApi.reducerPath]: airviewApi.reducer,
    [branchManagerSlice.name]: branchManagerSlice.reducer,
    [editorContextSlice.name]: editorContextSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(airviewApi.middleware);
  },
  devTools: process.env.NODE_ENV !== "production",
});
