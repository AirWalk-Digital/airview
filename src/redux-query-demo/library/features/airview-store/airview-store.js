import { configureStore } from "@reduxjs/toolkit";
import { branchesSlice } from "../branches";
import { entriesMetaSlice } from "../entries-meta";
import { entrySlice } from "../entry";
//import { editorContextSlice } from "../editor-context";
//import { airviewApi } from "../airview-api";

export const airviewStore = configureStore({
  reducer: {
    [branchesSlice.name]: branchesSlice.reducer,
    [entriesMetaSlice.name]: entriesMetaSlice.reducer,
    [entrySlice.name]: entrySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
