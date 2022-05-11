import { createSlice } from "@reduxjs/toolkit";

export function createInitialWorkingBranchState(baseBranch, workingBranch) {
  return {
    baseBranch,
    workingBranch,
  };
}

export const workingBranchSlice = createSlice({
  name: "workingBranchSlice",
  initialState: createInitialWorkingBranchState(),
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
