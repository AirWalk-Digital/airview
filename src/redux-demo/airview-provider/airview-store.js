import { configureStore } from "@reduxjs/toolkit";
import { branchesSlice } from "../branching";
import { allEntriesMetaSlice } from "../all-entries-meta";

export const airviewStore = configureStore({
  reducer: {
    [allEntriesMetaSlice.name]: allEntriesMetaSlice.reducer,
    [branchesSlice.name]: branchesSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
