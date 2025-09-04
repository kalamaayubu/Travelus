import { BookingInfoProps } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { value: BookingInfoProps | null } = {
    value: null
}

const bookingInfoSlice = createSlice({
    name: 'bookingInfo',
    initialState,
    reducers: {
        setBookingInfo(state, action:PayloadAction<BookingInfoProps>) {
            state.value = (action.payload)
        }
    }
});

export const { setBookingInfo } = bookingInfoSlice.actions
export default bookingInfoSlice.reducer