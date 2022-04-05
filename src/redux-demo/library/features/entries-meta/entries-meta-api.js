import { airviewApi } from "../airview-api/airview-api";

const extendedApi = airviewApi.injectEndpoints({
  endpoints: (build) => ({
    getAllEntriesMeta: build.query({
      query: ({ branch, branchSha }) => `/entries/${branch}`,
      providesTags: (result, error, arg) => {
        return [{ type: "EntriesMeta", id: arg.branchSha }];
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllEntriesMetaQuery } = extendedApi;
