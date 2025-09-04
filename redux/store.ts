import { configureStore } from '@reduxjs/toolkit'
import vehicleTypesReducer from "./slices/vehicleTypesSlice"
import authStateReducer from "./slices/authSlice"
import bookingInfoReducer from './slices/bookingInfoSlice'

export const store = configureStore({
    reducer: {
        vehicleTypes: vehicleTypesReducer,
        auth: authStateReducer,
        bookingInfo: bookingInfoReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch