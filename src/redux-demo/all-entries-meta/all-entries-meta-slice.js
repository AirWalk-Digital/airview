import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

const allEntriesMetaAdapter = createEntityAdapter();

const initialState = allEntriesMetaAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchAllEntriesMeta = createAsyncThunk(
  "allEntriesMetaSlice/fetchAllEntriesMeta",
  async (args, { getState, signal, rejectWithValue, requestId }) => {
    try {
      const branchesResponse = await fetch("/api/branches", {
        cache: "no-cache",
        signal,
      });

      const branchesData = await branchesResponse.json();

      if (!branchesResponse.ok) {
        return rejectWithValue({
          name: "Fetch Error",
          message: branchesData.message,
          code: branchesResponse.status,
        });
      }

      const { workingBranch } = getState().branchesSlice;

      const branchSha = branchesData.filter(
        (branch) => branch.name === workingBranch
      )[0]?.sha;

      const allEntriesMetaResponse = await fetch(
        branchSha
          ? `/api/entries/${workingBranch}?${branchSha}`
          : `/api/entries/${workingBranch}`,
        { cache: "force-cache", signal }
      );

      const allEntriesMetaData = await allEntriesMetaResponse.json();

      if (!allEntriesMetaResponse.ok) {
        return rejectWithValue({
          name: "Fetch Error",
          message: allEntriesMetaData.message,
          code: allEntriesMetaResponse.status,
        });
      }

      return Object.values(allEntriesMetaData);
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const allEntriesMetaSlice = createSlice({
  name: "allEntriesMetaSlice",
  initialState,
  extraReducers(builder) {
    builder.addCase(fetchAllEntriesMeta.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllEntriesMeta.fulfilled, (state, action) => {
      allEntriesMetaAdapter.setAll(state, action.payload);
      state.status = "fulfilled";
    });
    builder.addCase(fetchAllEntriesMeta.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
      allEntriesMetaAdapter.removeAll(state);
    });
  },
});
