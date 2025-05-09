// import { configureStore } from '@reduxjs/toolkit';
// import jobApi from './features/postjob/jobApi';
// export const store = configureStore({
//   reducer: {
//     [jobApi.reducerPath]: jobApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(jobApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// src/app/store.js or store.ts (if using TypeScript)

import { configureStore } from '@reduxjs/toolkit';
import jobApi from './features/postjob/jobApi';
import { clientProfileApi } from './features/ClientProfile/clientProfileApi';

export const store = configureStore({
  reducer: {
    [jobApi.reducerPath]: jobApi.reducer,
    [clientProfileApi.reducerPath]: clientProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      jobApi.middleware,
      clientProfileApi.middleware
    ),
});

// For TypeScript support (keep this even if file is store.js for consistency)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
