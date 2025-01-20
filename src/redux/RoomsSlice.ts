import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICheckinData } from "../interface/IRoom";
import supabase from "../services/supabsase";
import { differenceInDays } from "date-fns";

interface Range {
  from: Date | undefined;
  to: Date | undefined;
}

interface RoomsState {
  isCheckInModal: boolean;
  breakfast: boolean;
  isPaid: boolean;
  range: Range;
  totalPricePerAllNight: number | null;
  isLoading: boolean;
}

const initialState: RoomsState = {
  isCheckInModal: false,
  isLoading: false,
  breakfast: false,
  isPaid: false,
  range: { from: undefined, to: undefined },
  totalPricePerAllNight: null
};

export const createBooking = createAsyncThunk(
  "rooms/createBooking",
  async (bookingData: ICheckinData, { rejectWithValue }) => {
    const token = sessionStorage.getItem("token");
    if (token === null) throw new Error("you are not authorized please login");
    const { error } = await supabase
      .from("reservations")
      .insert([bookingData])
      .single();
    if (error) {
      console.log(error);
      return rejectWithValue("Booking could not be created");
    }

    const { roomId } = bookingData;
    const { error: updateError } = await supabase
      .from("hotelRooms")
      .update({
        isReserved: true
        // availableFrom: startDate,
        // availableTo: endDate
      })
      .eq("id", roomId);

    if (updateError) {
      console.log(updateError);
      return rejectWithValue(
        "Booking created, but room status could not be updated"
      );
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
    },
    handleTotalPrice: (state, action: PayloadAction<number>) => {
      const selectedStartDate = state.range.from;
      const selectedEndDate = state.range.to;
      const numberOfNight = differenceInDays(
        String(selectedEndDate),
        String(selectedStartDate)
      );

      state.totalPricePerAllNight = numberOfNight * action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBooking.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(createBooking.fulfilled, (state) => {
        state.isCheckInModal = false;
        state.isLoading = false;
        state.breakfast = false;
        state.range.to = undefined;
        state.range.from = undefined;
      });
  }
});

export const { CheckInModal, toggleBreakfast, handleRange, handleTotalPrice } =
  roomSlice.actions;
export default roomSlice.reducer;
