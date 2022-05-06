import { createSlice } from "@reduxjs/toolkit";

const baseBranch = "main"; // Need to read from a passed config

const initialState = {
  baseBranch,
  workingBranch: baseBranch,
};

export const workingBranchSlice = createSlice({
  name: "workingBranchSlice",
  initialState,
  reducers: {
    setWorkingBranch: (state, action) => {
      state.workingBranch = action.payload;
    },
    resetWorkingBranch: (state) => {
      state.workingBranch = state.baseBranch;
    },
  },
});

export const { setWorkingBranch, resetWorkingBranch } =
  workingBranchSlice.actions;

export const selectBaseBranch = (state) => state.workingBranchSlice.baseBranch;
export const selectWorkingBranch = (state) =>
  state.workingBranchSlice.workingBranch;
