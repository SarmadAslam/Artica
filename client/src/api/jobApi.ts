import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "@/lib/baseURL";
const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/jobs`,
  credentials: "include",
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery,
  tagTypes: ["Jobs"],
  endpoints: (builder) => ({
    fetchAllJobs: builder.query<any[], void>({  // change from any to proper return type if known
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
    updateJob: builder.mutation({
      query: ({ id, ...updatedJob }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: updatedJob,
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
  useUpdateJobMutation,
} = jobApi;

export default jobApi;
