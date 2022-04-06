import { createSlice } from "@reduxjs/toolkit";

const baseBranch = "main"; // need to read this from a config

const initialState = {
  workingBranch: baseBranch,
};

export const branchManagerSlice = createSlice({
  name: "branchManager",
  initialState,
  reducers: {
    setWorkingBranch(state, action) {
      state.workingBranch = action.payload;
    },
  },
});

export const { setWorkingBranch } = branchManagerSlice.actions;

export function selectWorkingBranch(state) {
  return state.branchManager.workingBranch;
}
