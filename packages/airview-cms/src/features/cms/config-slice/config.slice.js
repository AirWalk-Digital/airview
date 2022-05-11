import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "configSlice",
  initialState: {},
});

export const selectBaseBranch = (state) => state.configSlice.baseBranch;

export const selectAllCollections = (state) => state.configSlice.collections;
