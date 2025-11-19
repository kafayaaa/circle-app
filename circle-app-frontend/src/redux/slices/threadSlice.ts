import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Thread } from "../types/threadType";
import axios from "axios";
import api from "@/api/api";

interface ThreadState {
  threads: Thread[];
  loading: boolean;
  error: string | null;
}

const initialState: ThreadState = {
  threads: [],
  loading: false,
  error: null,
};

export const fetchThreads = createAsyncThunk(
  "threads/fetchThreads",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/thread/thread");
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch threads"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = false;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default threadSlice.reducer;
