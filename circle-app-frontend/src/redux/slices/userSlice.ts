import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "../types/userType";
import api from "@/api/api";
import axios from "axios";
import type { RootState } from "../store";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/user/users");
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch users"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData: FormData, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const res = await api.put(`/user/update-user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch users"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addThreadFromSocket: (state, action) => {
      state.users.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;

        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addThreadFromSocket } = userSlice.actions;
export default userSlice.reducer;
