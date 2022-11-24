import { configureStore } from "@reduxjs/toolkit/";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./slicers/AuthSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
