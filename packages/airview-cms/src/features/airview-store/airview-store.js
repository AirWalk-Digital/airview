import { configureStore } from "@reduxjs/toolkit";
import { airviewApi } from "./airview-api";
import { workingBranchSlice } from "../toolbar";
import { branchCreatorSlice } from "../branch-creator";
import { metaEditorSlice } from "../meta-editor/";
import { cmsSlice } from "../cms";

export const airviewStore = configureStore({
  reducer: {
    [airviewApi.reducerPath]: airviewApi.reducer,
    [workingBranchSlice.name]: workingBranchSlice.reducer,
    [branchCreatorSlice.name]: branchCreatorSlice.reducer,
    [metaEditorSlice.name]: metaEditorSlice.reducer,
    [cmsSlice.name]: cmsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(airviewApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
