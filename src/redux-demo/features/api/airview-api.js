import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import matter from "gray-matter";

export const airviewApi = createApi({
  reducerPath: "airviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getEntry: builder.query({
      query: ({ id, branch }) => `content/${id}/${branch}`,
      transformResponse: (response) => normalizeEntryData(response),
    }),
  }),
});

export const { useGetEntryQuery, useLazyGetEntryQuery } = airviewApi;

function normalizeEntryData(entryData) {
  const parsedMarkdown = Object.entries(entryData).map(([key, entryData]) => {
    const { data, content } = matter(atob(entryData));

    return [key, { data, content }];
  });

  return Object.fromEntries(parsedMarkdown);
}
