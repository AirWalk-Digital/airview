import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "../editor/ui-slice";
import { branchesSlice } from "../editor/branch-slice";

export const airviewStore = configureStore({
  reducer: {
    [uiSlice.name]: uiSlice.reducer,
    [branchesSlice.name]: branchesSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
