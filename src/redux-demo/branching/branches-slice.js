import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const branchesData = [
  {
    name: "main",
    sha: "abc",
    isProtected: true,
  },
  {
    name: "one",
    sha: "cde",
    isProtected: false,
  },
  {
    name: "two",
    sha: "efg",
    isProtected: false,
  },
];

const baseBranch = "main"; // need to read this from a config

export const fetchBranches = createAsyncThunk(
  "branchesSlice/fetchBranches",
  async (arg, { signal, rejectWithValue }) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(branchesData), [500]);
    });
    // try {
    //   // const response = await fetch("/api/branches", {
    //   //   cache: "no-cache",
    //   //   signal,
    //   // });

    //   // const data = await response.json();

    //   // if (!response.ok) {
    //   //   console.log("error:", data);
    //   //   throw new Error(data.message);
    //   // }

    //   // return data;
    // } catch (error) {
    //   return rejectWithValue({ ...error });
    // }
  }
);

const initialState = {
  status: "idle",
  error: null,
  baseBranch,
  workingBranch: baseBranch,
  branches: null,
};

export const branchesSlice = createSlice({
  name: "branchesSlice",
  initialState,
  reducers: {
    setWorkingBranch(state, action) {
      state.workingBranch = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchBranches.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchBranches.fulfilled, (state, action) => {
      state.branches = [...action.payload];
      state.status = "fulfilled";
    });
    builder.addCase(fetchBranches.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { setWorkingBranch } = branchesSlice.actions;
