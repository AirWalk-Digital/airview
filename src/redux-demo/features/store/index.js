import { configureStore } from "@reduxjs/toolkit";
import entryReducer from "../entry";

export const store = configureStore({
  reducer: {
    [entryReducer.name]: entryReducer.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
