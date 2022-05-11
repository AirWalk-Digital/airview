import { configureStore } from "@reduxjs/toolkit";
import { airviewApi } from "./airview-api";
import {
  cmsSlice,
  createInitialWorkingBranchState,
  workingBranchSlice,
  branchCreatorSlice,
  metaEditorSlice,
  createPullRequestSlice,
} from "../cms";

export function initStore(config) {
  const preloadedState = {
    [workingBranchSlice.name]: createInitialWorkingBranchState(
      config.baseBranch,
      config.baseBranch
    ),
  };

  return configureStore({
    reducer: {
      [airviewApi.reducerPath]: airviewApi.reducer,
      [workingBranchSlice.name]: workingBranchSlice.reducer,
      [branchCreatorSlice.name]: branchCreatorSlice.reducer,
      [metaEditorSlice.name]: metaEditorSlice.reducer,
      [cmsSlice.name]: cmsSlice.reducer,
      [createPullRequestSlice.name]: createPullRequestSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(airviewApi.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
