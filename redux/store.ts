import { configureStore } from "@reduxjs/toolkit";
import vehicleTypesReducer from "./slices/vehicleTypesSlice";
import authStateReducer from "./slices/authSlice";
import bookingInfoReducer from "./slices/bookingInfoSlice";
import resizeAndDragReducer from "./slices/resizeAndDrag";

export const store = configureStore({
  reducer: {
    vehicleTypes: vehicleTypesReducer,
    auth: authStateReducer,
    bookingInfo: bookingInfoReducer,
    rnd: resizeAndDragReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
