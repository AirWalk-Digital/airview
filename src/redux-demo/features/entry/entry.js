import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import matter from "gray-matter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const set = require("lodash/set");

const initialState = {
  status: "idle",
  error: null,
  id: null,
  originalData: null,
  editsData: null,
};

export const fetchEntryData = createAsyncThunk(
  "entry/fetchEntryData",
  async ({ id, branch }, { signal, rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`/api/content/${id}/${branch}`, {
        signal,
      });

      const data = await response.json();

      if (response.ok) {
        const parsedMarkdown = Object.entries(data).map(([key, entryData]) => {
          const { data, content } = matter(atob(entryData));

          return [key, { data, content }];
        });

        return Object.fromEntries(parsedMarkdown);
      }

      console.log("error", data);
    } catch (error) {
      return rejectWithValue({ ...error });
    }
  }
);

export const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    setEntryId(state, action) {
      state.id = action.payload;
    },
    persistEdits(state, action) {
      const { path, value } = action.payload;

      set(state.editsData, path, value);
    },
    clearEdits(state) {
      state.editsData = state.originalData;
    },
    resetEntryState(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEntryData.pending, (state, action) => {
      console.log(state, action);
      state.status = "loading";
    });
    builder.addCase(fetchEntryData.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.originalData = action.payload;
      state.editsData = action.payload;
    });
    builder.addCase(fetchEntryData.rejected, (state, action) => {
      if (action.meta.aborted) {
        return;
      }

      state.status = "failed";
      state.error = action.payload;
    });
  },
});

const { setEntryId, persistEdits, clearEdits, resetEntryState } =
  entrySlice.actions;

export { persistEdits, clearEdits };

export function useGetEntry(id) {
  const {
    originalData,
    editsData: data,
    ...rest
  } = useSelector((state) => state.entry);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(resetEntryState());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setEntryId(id));
    const entryRequest = dispatch(fetchEntryData({ id, branch: "main" }));

    return () => {
      entryRequest.abort();
    };
  }, [dispatch, id]);

  return { ...rest, data };
}
