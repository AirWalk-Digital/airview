import { createSlice } from "@reduxjs/toolkit";

export const workingBranchSlice = createSlice({
  name: "workingBranchSlice",
  initialState: {},
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

export const selectWorkingBranch = (state) =>
  state.workingBranchSlice.workingBranch;
