import { createSlice } from "@reduxjs/toolkit";

export const workingBranchSlice = createSlice({
  name: "workingBranchSlice",
  initialState: {},
  reducers: {
    setWorkingBranch: (state, action) => {
      state.workingBranch = action.payload;
    },
  },
});

export const { setWorkingBranch } = workingBranchSlice.actions;

export const selectWorkingBranch = (state) =>
  state.workingBranchSlice.workingBranch;
