import { Status } from "../../utils/status";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllNews } from "./newsThunk";
import { AllNewsType } from "../../types/type";

interface NewsState {
  news: AllNewsType[];
  savedNews: AllNewsType[];
  status: string;
  errorMessage: string;
  totalPages: number;
  currentPage?: number;
}

const initialState: NewsState = {
  news: [],
  savedNews: [],
  status: Status.IDLE,
  errorMessage: "",
  totalPages: 0,
  currentPage: 1,
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    savedNews: (state, action: PayloadAction<AllNewsType>) => {
      state.savedNews = [...state.savedNews, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.news = action.payload?.data.results || [];
        state.totalPages = Math.ceil(
          (action.payload?.data.num_results || 0) / 10
        );
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch all news.";
      });
  },
});

export const { savedNews } = newsSlice.actions;

export default newsSlice.reducer;
