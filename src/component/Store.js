import {configureStore} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import cartReducer from "./CartSlice"
import CurdSlice from './CurdSlice';
import { usersApi } from './UserApi';

export const store=configureStore({
    reducer:{
        allCart:cartReducer,
        curd:CurdSlice,
        [usersApi.reducerPath]:usersApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware),
})
setupListeners(store.dispatch)