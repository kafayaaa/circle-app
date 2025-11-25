import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "@/api/api";
import type { User } from "../types/userType";

interface SearchState {
  keyword: string;
  results: User[];
  loading: boolean;
  isTyping: boolean;
}

const initialState: SearchState = {
  keyword: "",
  results: [],
  loading: false,
  isTyping: false,
};

export const fetchAllUsers = createAsyncThunk<User[], void>(
  "search/fetchAll",
  async () => {
    const res = await api.get("/users");
    return res.data.data;
  }
);

export const fetchSearch = createAsyncThunk<User[], string>(
  "search/fetch",
  async (keyword: string) => {
    const res = await api.get(`/user/users?search=${keyword}`);
    console.log(res);
    return res.data.data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearResults(state) {
      state.results = [];
    },
    setTyping(state, action) {
      state.isTyping = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSearch.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.results = action.payload;
        }
      )
      .addCase(fetchSearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      });
  },
});

export const { setKeyword, clearResults, setTyping } = searchSlice.actions;
export default searchSlice.reducer;
