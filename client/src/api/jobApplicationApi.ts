// src/features/api/jobApplicationApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jobApplicationApi = createApi({
  reducerPath: 'jobApplicationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    submitApplication: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: '/apply',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useSubmitApplicationMutation } = jobApplicationApi;
