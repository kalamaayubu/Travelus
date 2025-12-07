import { createSlice } from "@reduxjs/toolkit";

interface RnDState {
  isPanelOpen: boolean;
}

const initialState: RnDState = {
  isPanelOpen: false,
};

const resizeAndDrag = createSlice({
  name: "rnd",
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

export const { togglePanel, openPanel, closePanel } = resizeAndDrag.actions;
export default resizeAndDrag.reducer;
