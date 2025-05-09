import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsType } from "@/types/news";
import getBaseUrl from "@/lib/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/news`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery,
  tagTypes: ["News"],
  endpoints: (builder) => ({
    fetchNews: builder.query<NewsType[], void>({
      query: () => "/",
      providesTags: ["News"],
    }),
    createNews: builder.mutation<NewsType, Partial<NewsType>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["News"],
    }),
    updateNews: builder.mutation<void, { id: string; data: Partial<NewsType> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["News"],
    }),
    deleteNews: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["News"],
    }),
  }),
});

export const {
  useFetchNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} = newsApi;
