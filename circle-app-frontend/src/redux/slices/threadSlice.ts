import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Thread } from "../types/threadType";
import axios from "axios";
import api from "@/api/api";

interface ThreadState {
  threads: Thread[];
  threadDetail: Thread | null;
  loading: boolean;
  error: string | null;
}

const initialState: ThreadState = {
  threads: [],
  loading: false,
  error: null,
  threadDetail: null,
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

export const fetchThreadById = createAsyncThunk(
  "threads/fetchThreadById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const res = await api.get(`/thread/thread/${id}`);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to get thread"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const createThread = createAsyncThunk(
  "threads/createThread",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await api.post("/thread/add-thread", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to create thread"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const threadSlice = createSlice({
  name: "threads",
  initialState,
  reducers: {
    addThreadFromSocket: (state, action) => {
      state.threads.unshift(action.payload);
    },
    updateThreadLikeFromSocket: (state, action) => {
      const { thread_id, likes_count } = action.payload;
      const thread = state.threads.find((t) => t.id === thread_id);
      if (thread) {
        if (!thread._count) thread._count = { replies: 0, likes: 0 };
        thread._count.likes = likes_count;
      }

      if (state.threadDetail && state.threadDetail.id === thread_id) {
        if (!state.threadDetail._count)
          state.threadDetail._count = { replies: 0, likes: 0 };
        state.threadDetail._count.likes = likes_count;
      }
    },
  },
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
      })
      .addCase(fetchThreadById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.loading = false;
        state.threadDetail = action.payload;
      })
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createThread.pending, (state) => {
        state.loading = true;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.loading = false;
        state.threads.unshift(action.payload);
      })
      .addCase(createThread.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default threadSlice.reducer;
export const { addThreadFromSocket, updateThreadLikeFromSocket } =
  threadSlice.actions;
