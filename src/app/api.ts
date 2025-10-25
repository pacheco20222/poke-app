import { retry } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQueryWithRetry = retry(
  fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  {
    maxRetries: 3,
  }
)

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Pokemon', 'Species', 'Ability', 'Move'],
  keepUnusedDataFor: 60,

  refetchOnMountOrArgChange: 30,
  refetchOnReconnect: true,
  refetchOnFocus: false,

  endpoints: () => ({}),

});

export default baseApi;