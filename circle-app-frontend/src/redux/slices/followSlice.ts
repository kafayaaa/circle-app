import api from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface FollowState {
  following: number[];
  followers: number[];
  loading: boolean;
  error: string | null;
}
const initialState: FollowState = {
  following: [],
  followers: [],
  loading: false,
  error: null,
};

export const addFollow = createAsyncThunk(
  "folllow/addFollow",
  async (
    data: { userId: number | undefined; add_follow_id: number | null },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/follows/add-follow", data);
      console.log(res.data);
      return res.data;
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

const followSlice = createSlice({
  name: "follows",
  initialState,
  reducers: {
    addFollowFromSocket: (state, action) => {
      state.following.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFollow.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFollow.fulfilled, (state, action) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(addFollow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default followSlice.reducer;
export const { addFollowFromSocket } = followSlice.actions;
