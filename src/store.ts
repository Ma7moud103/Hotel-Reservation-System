import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./redux/RoomsSlice";
import { authReducer } from "./redux/AuthSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
