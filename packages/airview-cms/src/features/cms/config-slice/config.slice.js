import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "configSlice",
  initialState: {},
});

export const selectBaseBranch = (state) => state.configSlice.baseBranch;
