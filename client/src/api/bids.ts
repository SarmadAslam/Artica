import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BidType } from "@/types/bid";
import getBaseUrl from "@/lib/baseURL";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/bids`,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const bidsApi = createApi({
  reducerPath: "bidsApi",
  baseQuery,
  tagTypes: ["Bids"],
  endpoints: (builder) => ({
    fetchBids: builder.query<BidType[], void>({
      query: () => "/",
      providesTags: ["Bids"],
    }),
    addBid: builder.mutation<BidType, Partial<BidType>>({
      query: (newBid) => ({
        url: "/",
        method: "POST",
        body: newBid,
      }),
      invalidatesTags: ["Bids"],
    }),
    updateBid: builder.mutation<void, { id: string; data: Partial<BidType> }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bids"],
    }),
    deleteBid: builder.mutation<void, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bids"],
    }),
  }),
});

export const {
  useFetchBidsQuery,
  useAddBidMutation,
  useUpdateBidMutation,
  useDeleteBidMutation,
} = bidsApi;
