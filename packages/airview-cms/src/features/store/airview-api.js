import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let fetchFresh = false;

const baseQuery = async (args, api, extraOptions) => {
  const state = api.getState();
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: state.configSlice.baseUrl,
  });
  return rawBaseQuery(args, api, extraOptions);
};

export const airviewApi = createApi({
  reducerPath: "airviewApi",
  baseQuery,
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    getBranches: builder.query({
      query: () => {
        const headers = { "cache-control": `max-age=${fetchFresh ? 0 : 3600}` };
        fetchFresh = false;

        return {
          url: "branches",
          headers,
        };
      },
      providesTags: ["Branches"],
    }),
    createBranch: builder.mutation({
      query: ({ baseSha, name }) => ({
        url: "branches",
        method: "POST",
        body: {
          baseSha,
          name,
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
      // transformResponse: (response) => {
      //   const parsedResponse = Object.entries(response).map(
      //     ([key, entryData]) => {
      //       const { data, content } = matter(atob(entryData));

      //       return [key, { data, content }];
      //     }
      //   );

      //   return Object.fromEntries(parsedResponse);
      // },
      providesTags: (result, error, entrySha) => [
        { type: "Entry", id: entrySha },
      ],
    }),
    createPullRequest: builder.mutation({
      query: ({ baseBranch, headBranch }) => ({
        url: "pulls",
        method: "POST",
        body: {
          baseBranch,
          headBranch,
        },
      }),
    }),
    putEntry: builder.mutation({
      query: ({ id, branch, data, baseSha }) => {
        fetchFresh = true;
        return {
          url: `content/${id}?branch=${branch}&baseSha=${baseSha}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (_, error) => {
        if (error) return;

        return ["Branches"];
      },
    }),
  }),
});

export const {
  useGetBranchesQuery,
  useCreateBranchMutation,
  useGetEntriesQuery,
  useGetEntryQuery,
  useCreatePullRequestMutation,
  usePutEntryMutation,
} = airviewApi;
