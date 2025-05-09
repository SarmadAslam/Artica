import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CompetitionType } from "@/types/competition";
import getBaseUrl from "@/lib/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/competitions`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const competitionsApi = createApi({
  reducerPath: "competitionsApi",
  baseQuery,
  tagTypes: ["Competitions"],
  endpoints: (builder) => ({
    fetchCompetitions: builder.query<CompetitionType[], void>({
      query: () => "/",
      providesTags: ["Competitions"],
    }),
    createCompetition: builder.mutation<CompetitionType, Partial<CompetitionType>>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Competitions"],
    }),
    updateCompetition: builder.mutation<void, { id: string; data: Partial<CompetitionType> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Competitions"],
    }),
    deleteCompetition: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Competitions"],
    }),
  }),
});

export const {
  useFetchCompetitionsQuery,
  useCreateCompetitionMutation,
  useUpdateCompetitionMutation,
  useDeleteCompetitionMutation,
} = competitionsApi;
