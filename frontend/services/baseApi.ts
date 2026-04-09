import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base API to inject endpoints into
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
    // You can add prepareHeaders here for authentication tokens later
    prepareHeaders: (headers) => {
      // Example of adding authorization header to every request:
      // const token = (getState() as RootState).auth.token;
      // if (token) {
      //   headers.set('authorization', `Bearer ${token}`);
      // }
      return headers;
    },
  }),
  tagTypes: [], // Add tag types here for caching and invalidation
  endpoints: () => ({}), // Endpoints will be injected from other files
});
