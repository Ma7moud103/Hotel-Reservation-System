import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Range {
  from: string | undefined;
  to: string | undefined;
}

interface RoomsState {
  isCheckInModal: boolean;
  breakfast: boolean;
  isPaid: boolean;
  range: Range;
}

const initialState: RoomsState = {
  isCheckInModal: false,
  breakfast: false,
  isPaid: false,
  range: { from: undefined, to: undefined }
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    CheckInModal: (state, action: PayloadAction<"open" | "close">) => {
      if (action.payload === "close") state.isCheckInModal = false;
      if (action.payload === "open") state.isCheckInModal = true;
    },
    toggleBreakfast: (state, action: PayloadAction<"breakfast" | "isPaid">) => {
      if (action.payload === "breakfast") state.breakfast = !state.breakfast;
      if (action.payload === "isPaid") state.isPaid = !state.isPaid;
    },
    handleRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    }
  }
});

export const { CheckInModal, toggleBreakfast, handleRange } = roomSlice.actions;
export default roomSlice.reducer;
