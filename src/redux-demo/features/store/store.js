import { configureStore } from "@reduxjs/toolkit";
import { contextSlice } from "../context";
import { airviewApi } from "../api";

export const store = configureStore({
  reducer: {
    [airviewApi.reducerPath]: airviewApi.reducer,
    [contextSlice.name]: contextSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(airviewApi.middleware);
  },
  devTools: process.env.NODE_ENV !== "production",
});
