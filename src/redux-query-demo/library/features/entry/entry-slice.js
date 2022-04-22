import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matter from "gray-matter";
import { AirviewFetchError } from "../../util";

const baseBranch = "main"; // need to read this from a config

export const fetchEntry = createAsyncThunk(
  "entry/fetchEntry",
  async (
    { entryId, workingBranch, entrySha },
    { getState, signal, rejectWithValue }
  ) => {
    try {
      console.log("fetching");
      const response = await fetch(`/api/content/${entryId}/${workingBranch}`);

      const entryData = await response.json();

      if (!response.ok) {
        throw new AirviewFetchError(response.status, entryData.message);
      }

      return normalizeEntryData(entryData);
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  entryData: [],
};

export const entrySlice = createSlice({
  name: "entry",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchEntry.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchEntry.fulfilled, (state, action) => {
      state.entryData.splice(0, state.entryData.length);
      state.entryData.push(action.payload);
      state.status = "fulfilled";
    });
    builder.addCase(fetchEntry.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}
