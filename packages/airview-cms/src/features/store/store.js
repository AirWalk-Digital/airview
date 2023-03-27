import { configureStore } from "@reduxjs/toolkit";
import { airviewApi } from "./airview-api";
import {
  configSlice,
  cmsSlice,
  branchCreatorSlice,
  metaEditorSlice,
  bodyEditorSlice,
  createPullRequestSlice,
  contentCreatorSlice,
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
    [contentCreatorSlice.name]: {
      modalEnabled: false,
      collection: Object.keys(config.collections)[0],
      data: {},
    },
  };

  return configureStore({
    reducer: {
      [airviewApi.reducerPath]: airviewApi.reducer,
      [configSlice.name]: configSlice.reducer,
      [branchCreatorSlice.name]: branchCreatorSlice.reducer,
      [metaEditorSlice.name]: metaEditorSlice.reducer,
      [bodyEditorSlice.name]: bodyEditorSlice.reducer,
      [cmsSlice.name]: cmsSlice.reducer,
      [createPullRequestSlice.name]: createPullRequestSlice.reducer,
      [contentCreatorSlice.name]: contentCreatorSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(airviewApi.middleware),
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
  });
}
