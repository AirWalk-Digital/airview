import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { workingBranchSlice } from "../toolbar";
import { branchCreatorSlice } from "../branch-creator";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [workingBranchSlice.name]: workingBranchSlice.reducer,
    [branchCreatorSlice.name]: branchCreatorSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
