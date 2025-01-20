import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { ISignUpValues, IUser } from "../interface/Iuser";
import supabase from "../services/supabsase";
import { handleUserName, token } from "../utils/Vars";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  isAuthorized: boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  loading: false,
  error: null,
  token: token !== null ? token : null,
  isAuthorized: token !== null ? true : false
};

export const login = createAsyncThunk<
  { user: User | null; session: Session | null },
  IUser,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }

  if (data && data.session) {
    toast.success("Welcome to our hotel");
    sessionStorage.setItem("token", data.session.access_token);
    if (data.user?.email) {
      const userName = handleUserName(data.user.email);
      sessionStorage.setItem("userName", userName);
      sessionStorage.setItem("guestId", data.session.user.id);
    }
  }

  return { user: data.user, session: data.session };
});

export const signup = createAsyncThunk<
  { user: User | null; session: Session | null },
  ISignUpValues,
  { rejectValue: string }
>(
  "auth/signup",
  async ({ email, password, phone }: ISignUpValues, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      phone,
      email,
      password
    });

    if (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }

    if (data && data.session) {
      toast.success("you can login now");
    }

    return { user: data.user, session: data.session };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.session = null;
      state.error = null;
      state.isAuthorized = false;
      sessionStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User | null; session: Session | null }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.session = action.payload.session;
          state.isAuthorized = true;
        }
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred during login.";
        }
      )
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (
          state,
          action: PayloadAction<{ user: User | null; session: Session | null }>
        ) => {
          state.loading = false;
          state.user = action.payload.user;
          state.session = action.payload.session;
        }
      )
      .addCase(
        signup.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An error occurred during signup.";
        }
      );
  }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
