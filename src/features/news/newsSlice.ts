import { Status } from "../../utils/status";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllNews,
  fetchNewsIndonesia,
  fetchNewsProgramming,
  fetchNewsSearch,
} from "./newsThunk";

interface NewsState {
  news: any[];
  status: string;
  errorMessage: string;
}

const initialState: NewsState = {
  news: [],
  status: Status.IDLE,
  errorMessage: "",
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    savedNews: (state, action: PayloadAction<string>) => {
      const saveNewsPaper = state.news.find((news) => news === action.payload);
      if (!saveNewsPaper) {
        state.news.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    // handle fetchAllNews
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.news = action.payload.data.response.docs;
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch all news.";
      })

      // handle fetchNewsIndonesia
      .addCase(fetchNewsIndonesia.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsIndonesia.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.news = action.payload.data.response.docs;
      })
      .addCase(fetchNewsIndonesia.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch Indonesian news.";
      })

      // handle fetchNewsProgramming
      .addCase(fetchNewsProgramming.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsProgramming.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.news = action.payload.data.response.docs;
      })
      .addCase(fetchNewsProgramming.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch programming news.";
      })

      // handle fetchNewsSearch
      .addCase(fetchNewsSearch.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsSearch.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.news = action.payload.data.response.docs;
      })
      .addCase(fetchNewsSearch.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to search for news.";
      });
  },
});

export const { savedNews } = newsSlice.actions;

export default newsSlice.reducer;
