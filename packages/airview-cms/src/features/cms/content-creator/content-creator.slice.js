import { createSlice } from "@reduxjs/toolkit";
import { selectAllCollections } from "../config-slice";

const initialState = {
  modalEnabled: false,
  collection: null, // set when init store
  data: {},
};

export const contentCreatorSlice = createSlice({
  name: "contentCreatorSlice",
  initialState,
  reducers: {
    enableContentCreatorModal: (state) => {
      state.modalEnabled = true;
    },
    disableContentCreatorModal: (state) => {
      state.modalEnabled = false;
    },
    setCollection: (state, action) => {
      state.collection = action.payload;
    },
    initData: (state, action) => {
      state.data = action.payload;
    },
    persitData: (state, action) => {
      state.data[action.payload.key] = action.payload.data;
    },
  },
});

export const {
  enableContentCreatorModal,
  disableContentCreatorModal,
  setCollection,
  initData,
  persitData,
} = contentCreatorSlice.actions;

export const selectContentCreatorModalEnabledStatus = (state) =>
  state.contentCreatorSlice.modalEnabled;

export const selectContentCreatorSelectedCollection = (state) =>
  state.contentCreatorSlice.collection;

export const selectContentCreatorData = (state) =>
  state.contentCreatorSlice.data;

export function setInitialCollection() {
  return (dispatch, getState) => {
    const collections = selectAllCollections(getState());

    dispatch(setCollection(Object.keys(collections)[0]));
  };
}

export function setInitialData() {
  return (dispatch, getState) => {
    const collections = selectAllCollections(getState());
    const selectedCollection = selectContentCreatorSelectedCollection(
      getState()
    );

    if (!selectedCollection) {
      dispatch(initData({}));
      return;
    }

    const initialData = collections[selectedCollection].fields.map((field) => {
      return [field.name, field?.defaultValue ?? undefined];
    });

    dispatch(initData(Object.fromEntries(initialData)));
  };
}
