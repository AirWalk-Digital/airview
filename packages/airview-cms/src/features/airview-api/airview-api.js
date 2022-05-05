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
  }),
});

export const { useGetBranchesQuery } = airviewApi;
