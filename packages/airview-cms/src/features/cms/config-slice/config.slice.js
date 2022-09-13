import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "configSlice",
  initialState: {},
});

export const selectBaseBranch = (state) => state.configSlice.baseBranch;

export const selectBaseUrl = (state) => state.configSlice.baseUrl;

export const selectAllCollections = (state) => state.configSlice.collections;

export const selectAllCollectionsLabelsAndIds = (state) => {
  const collectionIds = Object.entries(state.configSlice.collections).map(
    ([entryId, entryData]) => {
      return { id: entryId, label: entryData.label };
    }
  );

  return collectionIds;
};

export const selectVisibleCollectionsLabelsAndIds = (state) => {
  const collectionIds = Object.entries(state.configSlice.collections)
    .filter((entry) => !entry[1].hidden)
    .map(([entryId, entryData]) => {
      return { id: entryId, label: entryData.label };
    });

  return collectionIds;
};
