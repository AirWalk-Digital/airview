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
  }),
});

export const { useGetBranchesQuery, useCreateBranchMutation } = airviewApi;
