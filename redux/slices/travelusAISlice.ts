import { createSlice } from "@reduxjs/toolkit";

interface RnDState {
  isPanelOpen: boolean;
}

const initialState: RnDState = {
  isPanelOpen: false,
};

const travelusAI = createSlice({
  name: "travelusAI",
  initialState,
  reducers: {
    togglePanel: (state) => {
      state.isPanelOpen = !state.isPanelOpen;
    },
    openPanel: (state) => {
      state.isPanelOpen = true;
    },
    closePanel: (state) => {
      state.isPanelOpen = false;
    },
  },
});

export const { togglePanel, openPanel, closePanel } = travelusAI.actions;
export default travelusAI.reducer;
