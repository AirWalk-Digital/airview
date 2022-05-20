import { createSlice } from "@reduxjs/toolkit";
import { selectWorkingBranch } from "../cms.slice";
import { selectBaseBranch } from "../config-slice";

const initialState = {
  modalEnabled: false,
};

export const createPullRequestSlice = createSlice({
  name: "createPullRequestSlice",
  initialState,
  reducers: {
    enableCreatePullRequestModal: (state) => {
      state.modalEnabled = true;
    },
    disableCreatePullRequestModal: (state) => {
      state.modalEnabled = false;
    },
  },
});

export const { enableCreatePullRequestModal, disableCreatePullRequestModal } =
  createPullRequestSlice.actions;

export const selectCreatePullRequestModalEnabledStatus = (state) =>
  state.createPullRequestSlice.modalEnabled;

export const selectCanCreatePullRequest = (state) => {
  const workingBranch = selectWorkingBranch(state);
  const baseBranch = selectBaseBranch(state);

  return baseBranch !== workingBranch;
};
