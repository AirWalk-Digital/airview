import { airviewApi } from "../airview-api/airview-api";

const extendedApi = airviewApi.injectEndpoints({
  endpoints: (build) => ({
    getBranches: build.query({
      query: () => "/branches",
      providesTags: ["Branches"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetBranchesQuery } = extendedApi;
