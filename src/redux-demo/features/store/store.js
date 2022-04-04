import { configureStore } from "@reduxjs/toolkit";
import { contextSlice } from "../context";

export const store = configureStore({
  reducer: {
    [contextSlice.name]: contextSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
