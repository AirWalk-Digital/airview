import { configureStore } from "@reduxjs/toolkit";
import { airviewApi } from "../airview-api";
import { workingBranchSlice } from "../toolbar";
import { branchCreatorSlice } from "../branch-creator";
import { metaEditorSlice } from "../meta-editor/";

export const airviewStore = configureStore({
  reducer: {
    [airviewApi.reducerPath]: airviewApi.reducer,
    [workingBranchSlice.name]: workingBranchSlice.reducer,
    [branchCreatorSlice.name]: branchCreatorSlice.reducer,
    [metaEditorSlice.name]: metaEditorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(airviewApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
