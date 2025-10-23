import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api";
import authReducer from "../features/auth/authSlice"
import pokedexReducer from "../features/pokedex/pokedexSlice"

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
        pokedex: pokedexReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;