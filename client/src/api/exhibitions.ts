import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "@/lib/baseURL";
import { ExhibitionType } from "@/types/exhibition";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/exhibitions`,
  credentials: "include", // optional, for cookies if needed
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const exhibitionsApi = createApi({
  reducerPath: "exhibitionsApi",
  baseQuery,
  tagTypes: ["Exhibitions"],
  endpoints: (builder) => ({
    fetchExhibitions: builder.query<ExhibitionType[], void>({
      query: () => "/",
      providesTags: ["Exhibitions"],
    }),
    createExhibition: builder.mutation<ExhibitionType, Partial<ExhibitionType>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exhibitions"],
    }),
    updateExhibition: builder.mutation<void, { id: string; data: Partial<ExhibitionType> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Exhibitions"],
    }),
    deleteExhibition: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exhibitions"],
    }),
  }),
});

export const {
  useFetchExhibitionsQuery,
  useCreateExhibitionMutation,
  useUpdateExhibitionMutation,
  useDeleteExhibitionMutation,
} = exhibitionsApi;
