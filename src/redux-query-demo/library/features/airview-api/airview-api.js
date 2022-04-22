import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const airviewApi = createApi({
  reducerPath: "airviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["EntriesMeta", "Entry", "Branches"],
  endpoints: () => ({}),
});
