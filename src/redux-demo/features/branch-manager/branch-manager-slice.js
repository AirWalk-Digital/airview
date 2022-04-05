import { createSlice } from "@reduxjs/toolkit";

const baseBranch = "main";

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
