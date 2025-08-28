import { VehicleType, VehicleTypesState } from "@/types"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState: VehicleTypesState = {
    value: []
}

export const vehicleTypesSlice = createSlice({
    name: 'vehicleTypes',
    initialState,
    reducers: {
        saveVehicleTypes: (state, action: PayloadAction<VehicleType[]>) => {
            state.value = (action.payload)
        }
    }
})

export const { saveVehicleTypes } = vehicleTypesSlice.actions;
export default vehicleTypesSlice.reducer
