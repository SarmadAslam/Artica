// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { jobApi } from "@/api/jobApi"; // your job API slice
import { bidsApi } from "@/api/bids";
import { articlesApi } from "@/api/articles";
import { competitionsApi } from "./api/competitions";
import { newsApi } from "./api/news";
import { exhibitionsApi } from "./api/exhibitions";
import { clientProfileApi } from "./api/clientProfileApi";
import { participateInExhibitionApi } from "./api/participateInExhibitionApi";
import { jobApplicationApi } from './api/jobApplicationApi';

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [bidsApi.reducerPath]: bidsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [competitionsApi.reducerPath]: competitionsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [exhibitionsApi.reducerPath]: exhibitionsApi.reducer,
    [participateInExhibitionApi.reducerPath]: participateInExhibitionApi.reducer,
    [jobApplicationApi.reducerPath]: jobApplicationApi.reducer,
    [clientProfileApi.reducerPath]: clientProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobApi.middleware)
      .concat(bidsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(competitionsApi.middleware)
      .concat(newsApi.middleware)
      .concat(exhibitionsApi.middleware)
      .concat(participateInExhibitionApi.middleware)
      .concat(jobApplicationApi.middleware)
      .concat(clientProfileApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
