import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleType } from "@/types/article";
import getBaseUrl from "@/lib/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/articles`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const articlesApi = createApi({
  reducerPath: "articlesApi",
  baseQuery,
  tagTypes: ["Articles"],
  endpoints: (builder) => ({
    fetchArticles: builder.query<ArticleType[], void>({
      query: () => "/",
      providesTags: ["Articles"],
    }),
    createArticle: builder.mutation<ArticleType, Partial<ArticleType>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation<void, { id: string; data: Partial<ArticleType> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteArticle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});

export const {
  useFetchArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articlesApi;