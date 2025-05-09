// // src/features/api/clientProfileApi.ts

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const clientProfileApi = createApi({
//   reducerPath: 'clientProfileApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:3000/api/profiles', // Your backend base
//     credentials: 'include', // Optional: if you're using cookies
//   }),
//   endpoints: (builder) => ({
//     createClientProfile: builder.mutation({
//       query: (profileData) => ({
//         url: '/create-profile',
//         method: 'POST',
//         body: profileData,
//       }),
//     }),
//     //new 
//     getClientProfile: builder.query({
//       query: (userId) => `/client-profile/${userId}`,
//     }),
// //new till here 
//   }),
// });

// export const { useCreateClientProfileMutation ,   useGetClientProfileQuery} = clientProfileApi;


//new 
// src/features/api/clientProfileApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const clientProfileApi = createApi({
  reducerPath: 'clientProfileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/profiles',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
    credentials: 'include', // optional, useful if you're using cookies/sessions
  }),
  endpoints: (builder) => ({
    createClientProfile: builder.mutation({
      query: (profileData) => ({
        url: '/create-profile',
        method: 'POST',
        body: profileData,
      }),
    }),
    getClientProfile: builder.query({
      query: (userId) => `/client-profile/${userId}`,
    }),
  }),
});

export const { useCreateClientProfileMutation, useGetClientProfileQuery } = clientProfileApi;
