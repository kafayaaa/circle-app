import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  photo_profile: string | null;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      username: string;
      full_name: string;
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        credentials
      );
      return res.data.token; // token dikirim dari backend kamu
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Register failed"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

// 🔥 Thunk untuk Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { identifier: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        credentials
      );
      console.log("LOGIN RESPONSE:", res.data);
      return {
        token: res.data.data.token, // ← FIX
        user: {
          id: res.data.data.id,
          username: res.data.data.username,
          email: res.data.data.email,
          full_name: res.data.data.full_name,
          photo_profile: res.data.data.photo_profile,
        },
      }; // token dikirim dari backend kamu
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(err.response?.data?.message || "Login failed");
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;

        // save token
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
