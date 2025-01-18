import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinData } from "../interface/IRoom";
import supabase from "../services/supabsase";

interface Range {
  from: Date | undefined;
  to: Date | undefined;
}

interface RoomsState {
  isCheckInModal: boolean;
  breakfast: boolean;
  isPaid: boolean;
  range: Range;
  bookingStatus: "loading" | "success" | "failed";
  errorMessage: string;
}

const initialState: RoomsState = {
  isCheckInModal: false,
  breakfast: false,
  isPaid: false,
  range: { from: undefined, to: undefined },
  bookingStatus: "loading",
  errorMessage: ""
};

export const createBooking = createAsyncThunk(
  "rooms/createBooking",
  async (bookingData: ICheckinData, { rejectWithValue }) => {
    const { error } = await supabase
      .from("bookings")
      .insert([bookingData])
      .single();
    if (error) {
      console.log(error);
      return rejectWithValue("Booking could not be created");
    }
  }
);

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    CheckInModal: (state, action: PayloadAction<"open" | "close">) => {
      if (action.payload === "close") state.isCheckInModal = false;
      if (action.payload === "open") state.isCheckInModal = true;
    },
    toggleBreakfast: (
      state,
      action: PayloadAction<"breakfast" | "isPaid" | "reset">
    ) => {
      if (action.payload === "breakfast") state.breakfast = !state.breakfast;
      if (action.payload === "isPaid") state.isPaid = !state.isPaid;

      if (action.payload === "reset") {
        state.isPaid = false;
        state.breakfast = false;
      }
    },
    handleRange: (state, action: PayloadAction<Range>) => {
      state.range = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createBooking.fulfilled, (state) => {
      state.isCheckInModal = false;
    });
  }
});

export const { CheckInModal, toggleBreakfast, handleRange } = roomSlice.actions;
export default roomSlice.reducer;
