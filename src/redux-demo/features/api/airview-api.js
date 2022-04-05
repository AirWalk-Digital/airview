import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import matter from "gray-matter";

export const airviewApi = createApi({
  reducerPath: "airviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["EntriesMeta", "Entry", "Branches"],
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => "/branches",
      providesTags: ["Branches"],
    }),
    getAllEntriesMeta: builder.query({
      query: ({ branch, branchSha }) => `/entries/${branch}`,
      providesTags: (result, error, arg) => {
        return [{ type: "EntriesMeta", id: arg.branchSha }];
      },
    }),
    getEntry: builder.query({
      query: ({ entryId, branch, entrySha }) => `/content/${entryId}/${branch}`,
      transformResponse: (response) => normalizeEntryData(response),
      providesTags: (result, error, arg) => {
        return [{ type: "Entry", id: arg.entrySha }];
      },
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useGetEntryQuery,
  useGetAllEntriesMetaQuery,
  useLazyGetEntryQuery,
} = airviewApi;

function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}
