import { airviewApi } from "../airview-api/airview-api";
import matter from "gray-matter";

const extendedApi = airviewApi.injectEndpoints({
  endpoints: (build) => ({
    getEntry: build.query({
      query: ({ entryId, branch, entrySha }) => {
        return `/content/${entryId}/${branch}`;
      },
      transformResponse: (response) => normalizeEntryData(response),
      providesTags: (result, error, arg) => {
        return [{ type: "Entry", id: arg.entrySha }];
      },
    }),
  }),
  overrideExisting: false,
});

export const { useGetEntryQuery } = extendedApi;

// Temp util function, look to move to util at some point
function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}
