import { configureStore } from "@reduxjs/toolkit";
import { branchesSlice } from "../branches";
//import { editorContextSlice } from "../editor-context";
//import { airviewApi } from "../airview-api";

export const airviewStore = configureStore({
  reducer: {
    [branchesSlice.name]: branchesSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
