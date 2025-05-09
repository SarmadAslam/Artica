// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const participateInExhibitionApi = createApi({
//   reducerPath: 'participateInExhibitionApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:3000/api/artwork',  // backend URL
//   }),
//   endpoints: (builder) => ({
//     submitArtwork: builder.mutation({
//       query: (formData) => ({
//         url: '/participate',  // correct backend endpoint
//         method: 'POST',
//         body: formData,
        
//       }),
//     }),
    
//   }),
// });

// export const { useSubmitArtworkMutation } = participateInExhibitionApi;



import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const participateInExhibitionApi = createApi({
  reducerPath: 'participateInExhibitionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/artwork',  // backend URL
  }),
  endpoints: (builder) => ({
    submitArtwork: builder.mutation({
      query: (formData) => ({
        url: '/participate',
        method: 'POST',
        body: formData,
      }),
    }),
    getAllArtworks: builder.query({
      query: () => '/all',  // GET request to /all
    }),
  }),
  
});

export const { useSubmitArtworkMutation, useGetAllArtworksQuery } = participateInExhibitionApi;

