import { createSlice } from "@reduxjs/toolkit";

export const configSlice = createSlice({
  name: "configSlice",
  initialState: {},
});

export const selectBaseBranch = (state) => state.configSlice.baseBranch;

export const selectAllCollections = (state) => state.configSlice.collections;

export const selectAllCollectionsLabelsAndIds = (state) => {
  const collectionIds = Object.entries(state.configSlice.collections).map(
    ([entryId, entryData]) => {
      return { id: entryId, label: entryData.label };
    }
  );

  return collectionIds;
};
