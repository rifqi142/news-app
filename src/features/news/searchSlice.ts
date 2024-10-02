import { Status } from "../../utils/status";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchNewsIndonesia,
  fetchNewsProgramming,
  fetchNewsSearch,
} from "./newsThunk";
import { SearchNewsType } from "../../types/type";

interface SearchNewsState {
  searchNews: SearchNewsType[];
  status: string;
  errorMessage: string;
  totalPages: number;
  currentPage?: number;
}

const initialState: SearchNewsState = {
  searchNews: [],
  status: Status.IDLE,
  errorMessage: "",
  totalPages: 0,
  currentPage: 1,
};

export const searchNewSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    savedNews: (state, action: PayloadAction<SearchNewsType>) => {
      const saveNewsPaper = state.searchNews.find(
        (searchNews) => searchNews.web_url === action.payload.web_url
      );
      if (!saveNewsPaper) {
        state.searchNews.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // handle fetchNewsIndonesia
      .addCase(fetchNewsIndonesia.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsIndonesia.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.searchNews = action.payload.data.response.docs;

        const totalPages = Math.ceil(
          action.payload.data.response.meta.hits / 10
        );
        state.totalPages = totalPages;

        state.currentPage = action.meta.arg;
      })

      // handle fetchNewsProgramming
      .addCase(fetchNewsProgramming.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsProgramming.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.searchNews = action.payload.data.response.docs;
        const totalPages = Math.ceil(
          action.payload.data.response.meta.hits / 10
        );
        state.totalPages = totalPages;
        state.currentPage = action.meta.arg;
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
        state.searchNews = action.payload.data.response.docs;
      })
      .addCase(fetchNewsSearch.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to search for news.";
      });
  },
});

export const { savedNews } = searchNewSlice.actions;

export default searchNewSlice.reducer;
