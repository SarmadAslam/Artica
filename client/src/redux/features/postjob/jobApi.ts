import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../lib/baseURL";
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/jobs`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      // headers.set("Authorization", `Bearer ${token}`);
      headers.set("Authorization", `Bearer ${token}`); // ✅ Corrected

    }
    return headers;
  },
});

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery,
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    fetchAllJobs: builder.query({
      query: () => "/",
      providesTags: ["Jobs"],
    }),
    fetchJobById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    postJob: builder.mutation({
      query: (newJob) => ({
        url: "/create-job",
        method: "POST",
        body: newJob,
      }),
      invalidatesTags: ["Jobs"],
    }),
    
    deleteJob: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useFetchAllJobsQuery,
  useFetchJobByIdQuery,
  usePostJobMutation,
  useDeleteJobMutation,
} = jobApi;

export default jobApi;
