import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { workingBranchSlice } from "../toolbar";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [workingBranchSlice.name]: workingBranchSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
