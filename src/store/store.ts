import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import userSlice from "./slices/userSlice";
import userSliceWithCreateAPI from "./slices/userSliceWithCreateAPI";
import { userApi } from "./api/userApi";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        user: userSlice,
        userCreateAPI: userSliceWithCreateAPI,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware), 
    devTools: process.env.NODE_ENV !== 'production',
});

// Extracting RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
