import { configureStore } from "@reduxjs/toolkit";
import { entrySlice } from "../entry";

export const store = configureStore({
  reducer: {
    [entrySlice.name]: entrySlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
