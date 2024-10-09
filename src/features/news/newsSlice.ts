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
      const isAlreadySaved = state.savedNews.some(
        (news) => news.url === action.payload.url
      );

      if (!isAlreadySaved) {
        state.savedNews = [...state.savedNews, action.payload];
      }
    },

    unsaveNews: (state, action: PayloadAction<AllNewsType>) => {
      state.savedNews = state.savedNews.filter(
        (news) => news.url !== action.payload.url
      );
    },

    setSavedNews: (state, action: PayloadAction<AllNewsType[]>) => {
      state.savedNews = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

        state.totalPages = Math.ceil(500 / 20);
        const itemPerPage = 20;
        const offset = action.meta.arg.offset ?? 0;
        state.currentPage = Math.floor(offset / itemPerPage);
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch all news.";
      });
  },
});

export const { savedNews, setSavedNews, unsaveNews, setCurrentPage } =
  newsSlice.actions;

export default newsSlice.reducer;
