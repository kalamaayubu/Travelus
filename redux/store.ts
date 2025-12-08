import { configureStore } from "@reduxjs/toolkit";
import vehicleTypesReducer from "./slices/vehicleTypesSlice";
import authStateReducer from "./slices/authSlice";
import bookingInfoReducer from "./slices/bookingInfoSlice";
import travelusAIReducer from "./slices/travelusAISlice";

export const store = configureStore({
  reducer: {
    vehicleTypes: vehicleTypesReducer,
    auth: authStateReducer,
    bookingInfo: bookingInfoReducer,
    travelusAI: travelusAIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
