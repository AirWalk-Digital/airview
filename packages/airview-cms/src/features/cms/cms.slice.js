import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { selectBaseBranch } from "./config-slice";
import { selectDoesMetaEditorHaveEdits } from "./meta-editor";
import { airviewApi } from "../store";

const initialState = {
  cmsBusy: false,
  cmsEnabled: false,
  cmsContext: null,
  workingBranch: null,
};

export const cmsSlice = createSlice({
  name: "cmsSlice",
  initialState,
  reducers: {
    enableCms: (state) => {
      state.cmsEnabled = true;
    },
    disableCms: (state) => {
      state.cmsEnabled = false;
    },
    setCmsContext: (state, action) => {
      state.cmsContext = action.payload;
    },
    clearCmsContext: (state) => {
      state.cmsContext = null;
    },
    setWorkingBranch: (state, action) => {
      state.workingBranch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          airviewApi.endpoints.getBranches.matchPending,
          airviewApi.endpoints.getEntries.matchPending,
          airviewApi.endpoints.getEntry.matchPending,
          airviewApi.endpoints.createBranch.matchPending,
          airviewApi.endpoints.createPullRequest.matchPending,
          airviewApi.endpoints.putEntry.matchPending
        ),
        (state) => {
          state.cmsBusy = true;
        }
      )
      .addMatcher(
        isAnyOf(
          airviewApi.endpoints.getBranches.matchFulfilled,
          airviewApi.endpoints.getEntries.matchFulfilled,
          airviewApi.endpoints.getEntry.matchFulfilled,
          airviewApi.endpoints.createBranch.matchFulfilled,
          airviewApi.endpoints.createPullRequest.matchFulfilled,
          airviewApi.endpoints.putEntry.matchFulfilled
        ),
        (state) => {
          state.cmsBusy = false;
        }
      )
      .addMatcher(
        isAnyOf(
          airviewApi.endpoints.getBranches.matchRejected,
          airviewApi.endpoints.getEntries.matchRejected,
          airviewApi.endpoints.getEntry.matchRejected,
          airviewApi.endpoints.createBranch.matchRejected,
          airviewApi.endpoints.createPullRequest.matchRejected,
          airviewApi.endpoints.putEntry.matchRejected
        ),
        (state, action) => {
          if (action.meta.condition) return;
          state.cmsBusy = false;
        }
      );
  },
});

export const { enableCms, setCmsContext, clearCmsContext, setWorkingBranch } =
  cmsSlice.actions;

export const selectCmsEnabledStatus = (state) => state.cmsSlice.cmsEnabled;

export const selectCmsContext = (state) => state.cmsSlice.cmsContext;

export const selectCmsBusyStatus = (state) => state.cmsSlice.cmsBusy;

export const selectWorkingBranch = (state) => state.cmsSlice.workingBranch;

export const selectIsWorkingBranchProtected = (state) => {
  const getBranchesResult = airviewApi.endpoints.getBranches.select()(state);
  const { data: branches } = getBranchesResult;
  const workingBranch = selectWorkingBranch(state);

  if (!branches) return;

  return (
    branches.find((branch) => branch.name === workingBranch)?.isProtected ??
    false
  );
};

export function disableCms() {
  return (dispatch, getState) => {
    const metaEdits = selectDoesMetaEditorHaveEdits(getState());
    const baseBranch = selectBaseBranch(getState());

    const runDisableActions = () => {
      dispatch(cmsSlice.actions.disableCms());
      dispatch(cmsSlice.actions.setWorkingBranch(baseBranch));
    };

    if (metaEdits) {
      if (
        confirm(
          "You have unsaved changes; if you continue, your changes will be lost. Continue?"
        )
      ) {
        runDisableActions();
      } else {
        return;
      }
    }

    runDisableActions();
  };
}
