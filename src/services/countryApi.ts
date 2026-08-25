import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/",
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<any[], void>({
      query: () => "country",
    }),
  }),
});

export const {
  useGetCountriesQuery,
} = countryApi;
