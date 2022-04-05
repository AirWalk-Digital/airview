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

export function setWorkingBranch(branchName) {
  return function (dispatch, getState) {
    const edits = true;

    if (edits) {
      if (!window.confirm("You have unsaved edits, continue?")) return;
    }

    dispatch(branchManagerSlice.actions.setWorkingBranch(branchName));
  };
}

export function selectWorkingBranch(state) {
  return state.branchManager.workingBranch;
}
