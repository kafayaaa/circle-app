import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../types/userType";
import { updateUser } from "./userSlice";

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: true,
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
      return res.data.token;
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
      console.log("Login response:", res.data);
      return {
        token: res.data.data.token, // ← FIX
        user: {
          id: res.data.data.id,
          username: res.data.data.username,
          email: res.data.data.email,
          full_name: res.data.data.full_name,
          password: res.data.data.password,
          photo_profile: res.data.data.photo_profile,
          bio: res.data.data.bio,
          threads_count: res.data.data._count.threads,
          replies_count: res.data.data._count.replies,
          likes_count: res.data.data._count.likes,
          following: res.data.data._count.following,
          followers: res.data.data._count.followers,
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
    setToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
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
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
