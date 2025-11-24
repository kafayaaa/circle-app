import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Like } from "../types/likeType";
import api from "@/api/api";
import axios from "axios";

interface LikeState {
  likes: Like[];
  likedByUser: number[];
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likes: [],
  likedByUser: [],
  loading: false,
  error: null,
};

export const handleLike = createAsyncThunk(
  "likes/handleLike",
  async (data: { thread_id: number; user_id: number }, { rejectWithValue }) => {
    try {
      const res = await api.post("/like/handle-like", data);
      console.log(res.data);
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to handle like"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(handleLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLike.fulfilled, (state, action) => {
        state.loading = false;
        const { thread_id, likes_count, is_liked } = action.payload;

        const existing = state.likes.find((l) => l.thread_id === thread_id);

        if (existing) {
          existing.likes_count = likes_count;
        } else {
          state.likes.push({
            thread_id,
            likes_count,
          });
        }

        if (is_liked) {
          if (!state.likedByUser.includes(thread_id)) {
            state.likedByUser.push(thread_id);
          }
        } else {
          state.likedByUser = state.likedByUser.filter(
            (id) => id !== thread_id
          );
        }
      })
      .addCase(handleLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default likeSlice.reducer;
