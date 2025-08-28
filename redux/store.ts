import { configureStore } from '@reduxjs/toolkit'
import vehicleTypesReducer from "./slices/vehicleTypesSlice"

export const store = configureStore({
    reducer: {
        vehicleTypes: vehicleTypesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch