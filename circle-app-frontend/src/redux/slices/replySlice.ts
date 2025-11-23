import api from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { Reply } from "../types/replyType";

interface ReplyState {
  replies: Reply[];
  loading: boolean;
  error: string | null;
}

const initialState: ReplyState = {
  replies: [],
  loading: false,
  error: null,
};

export const fetchReplies = createAsyncThunk(
  "replies/fetchReplies",
  async (thread_id: string | number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/reply/${thread_id}`);
      return res.data.data;
      console.log(res.data.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch replies"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const createReply = createAsyncThunk(
  "replies/createReply",
  async (
    { id, formData }: { id: string | number; formData: FormData },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post(`/reply/add-reply/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to create reply"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    addReplyFromSocket: (state, action) => {
      state.replies.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReplies.fulfilled, (state, action) => {
        state.loading = false;
        state.replies = action.payload;
        state.error = null;
      })
      .addCase(fetchReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createReply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReply.fulfilled, (state, action) => {
        state.loading = false;
        state.replies.unshift(action.payload);
        state.error = null;
      })
      .addCase(createReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addReplyFromSocket } = replySlice.actions;
export default replySlice.reducer;
