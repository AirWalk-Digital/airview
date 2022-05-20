import { configureStore } from "@reduxjs/toolkit";
import { airviewApi } from "./airview-api";
import {
  configSlice,
  cmsSlice,
  branchCreatorSlice,
  metaEditorSlice,
  createPullRequestSlice,
} from "../cms";

export function initStore(config) {
  const preloadedState = {
    [cmsSlice.name]: {
      cmsBusy: false,
      cmsEnabled: false,
      cmsContext: null,
      workingBranch: config.baseBranch,
    },
    [configSlice.name]: config,
  };

  return configureStore({
    reducer: {
      [airviewApi.reducerPath]: airviewApi.reducer,
      [configSlice.name]: configSlice.reducer,
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
