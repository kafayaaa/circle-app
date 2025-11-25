import api from "@/api/api";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import type { Follow } from "../types/followType";

interface FollowState {
  following: Follow[];
  follower: Follow[];
  loading: boolean;
  error?: string | null;
}
const initialState: FollowState = {
  following: [],
  follower: [],
  loading: false,
  error: null,
};

export const fetchFollowing = createAsyncThunk<Follow[], void>(
  "follows/fetchFollowing",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/follows/followings");
      console.log(res);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch following"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const fetchFollower = createAsyncThunk<Follow[], void>(
  "follows/fetchFollower",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/follows/followers");
      console.log(res);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch follower"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const fetchMyFollowings = createAsyncThunk<Follow[], void>(
  "follow/fetchMyFollowings",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/follows/me"); // buat endpoint yang return followings untuk active user
      console.log(res);
      return res.data.data as Follow[];
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch following"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const fetchMyFollowers = createAsyncThunk<Follow[], void>(
  "follow/fetchMyFollowers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/follows/me-followers");
      console.log(res);
      return res.data.data as Follow[];
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to fetch follower"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const addFollow = createAsyncThunk(
  "folllow/addFollow",
  async (
    data: { userId: number; add_follow_id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/follows/add-follow", {
        add_follow_id: data.add_follow_id,
      });
      console.log(res.data);
      return res.data.data as Follow;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to follow"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

export const unfollow = createAsyncThunk(
  "follows/unfollow",
  async (
    data: { userId: number; unfollow_id: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.delete("/follows/unfollow", {
        data: {
          unfollow_id: data.unfollow_id,
        },
      });
      console.log(res.data);
      return res.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return rejectWithValue(
          err.response?.data?.message || "Failed to unfollow"
        );
      }
      return rejectWithValue("Unexpected error occurred");
    }
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    addFollowFromSocket: (state, action) => {
      if (!state.following) state.following = [];
      if (!action.payload) return;

      const exists = state.following.some(
        (f) =>
          f.follower_id === action.payload.follower_id &&
          f.following_id === action.payload.following_id
      );

      if (!exists) state.following.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFollowing.fulfilled,
        (state, action: PayloadAction<Follow[]>) => {
          state.loading = false;
          state.following = action.payload;
        }
      )
      .addCase(fetchFollowing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchFollower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFollower.fulfilled,
        (state, action: PayloadAction<Follow[]>) => {
          state.loading = false;
          state.follower = action.payload;
        }
      )
      .addCase(fetchFollower.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMyFollowings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMyFollowings.fulfilled,
        (state, action: PayloadAction<Follow[]>) => {
          state.loading = false;
          state.following = action.payload;
        }
      )
      .addCase(fetchMyFollowings.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(fetchMyFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMyFollowers.fulfilled,
        (state, action: PayloadAction<Follow[]>) => {
          state.loading = false;
          state.follower = action.payload;
        }
      )
      .addCase(fetchMyFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      })
      .addCase(addFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFollow.fulfilled, (state, action: PayloadAction<Follow>) => {
        state.loading = false;
        const exists = state.following.some(
          (f) =>
            f.follower_id === action.payload.follower_id &&
            f.following_id === action.payload.following_id
        );
        if (!exists) state.following.push(action.payload);
      })
      .addCase(addFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(unfollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unfollow.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(unfollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default followSlice.reducer;
export const { addFollowFromSocket } = followSlice.actions;
