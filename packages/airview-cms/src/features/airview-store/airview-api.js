import matter from "gray-matter";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airviewApi = createApi({
  reducerPath: "airviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => "branches",
      providesTags: ["Branches"],
    }),
    createBranch: builder.mutation({
      query: ({ baseBranchSha, branchName }) => ({
        url: "branches",
        method: "POST",
        body: {
          baseBranchSha,
          branchName,
        },
      }),
      invalidatesTags: (_, error) => {
        if (error) return;

        return ["Branches"];
      },
    }),
    getEntries: builder.query({
      query: (branchSha) => {
        return `entries/${branchSha}`;
      },
      providesTags: (result, error, branchSha) => [
        { type: "Entries", id: branchSha },
      ],
    }),
    getEntry: builder.query({
      query: (entrySha) => {
        return `content/${entrySha}`;
      },
      transformResponse: (response) => {
        const parsedResponse = Object.entries(response.content).map(
          ([key, entryData]) => {
            const { data, content } = matter(atob(entryData));

            return [key, { data, content }];
          }
        );

        return Object.fromEntries(parsedResponse);
      },
      providesTags: (result, error, entrySha) => [
        { type: "Entry", id: entrySha },
      ],
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useGetEntriesQuery,
  useGetEntryQuery,
} = airviewApi;
