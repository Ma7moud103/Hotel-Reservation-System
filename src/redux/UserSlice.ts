import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string;
}

const initialState: UserState = {
  username: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    }
  }
});

export const { updateUserName } = userSlice.actions;
export default userSlice.reducer;
