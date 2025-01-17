import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import supabase from "../services/supabsase";
import { ISignUpValues, IUser } from "../interface/Iuser";
import { Session, User } from "@supabase/supabase-js";
import { guestId, handleUserName, token } from "../utils/Vars";

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

    const { error: guestError } = await supabase
      .from("guests")
      .upsert({
        guestId: String(data.session.user.id),
        email: data.user?.email,
        fullName: handleUserName(data.session.user.email) ?? ""
      })
      .single();

    if (guestError) {
      toast.error("Error adding user to guests table");
      console.log(guestError);
      throw new Error(guestError.message);
    }
  }

  if (data?.user && !data.user.email_confirmed_at) {
    const { error: verificationError } = await supabase.auth.updateUser({
      email: data.user.email
    });

    if (verificationError) {
      console.log(verificationError);
      throw new Error(verificationError.message);
    }

    toast.info("A verification email has been sent. Please check your inbox.");
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
      password,
      options: {
        emailRedirectTo: null,
        shouldSendEmail: false
      }
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
      sessionStorage.removeItem("token");
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
