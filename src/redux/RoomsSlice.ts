import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RoomsState {
  roomType: string;
}

const initialState: RoomsState = {
  roomType: "all"
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    updateRoomType(state, action: PayloadAction<string>) {
      state.roomType = action.payload;
    }
  }
});

export const { updateRoomType } = roomSlice.actions;
export default roomSlice.reducer;
