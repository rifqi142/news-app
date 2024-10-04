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
  savedSearchNews: SearchNewsType[];
  status: string;
  errorMessage: string;
  totalPages: number;
  currentPage?: number;
}

const initialState: SearchNewsState = {
  searchNews: [],
  savedSearchNews: [],
  status: Status.IDLE,
  errorMessage: "",
  totalPages: 0,
  currentPage: 1,
};

export const searchNewSlice = createSlice({
  name: "searchnews",
  initialState,
  reducers: {
    savedSearchNews: (state, action: PayloadAction<SearchNewsType>) => {
      // const saveNewsPaper = state.searchNews.find(
      //   (searchNews) => searchNews.web_url === action.payload.web_url
      // );
      // if (!saveNewsPaper) {
      //   state.savedSearchNews = [...state.savedSearchNews, action.payload];
      // }
      const isAlreadySaved = state.savedSearchNews.some(
        (news: SearchNewsType) => news.web_url === action.payload.web_url
      );

      if (!isAlreadySaved) {
        state.savedSearchNews = [...state.savedSearchNews, action.payload];
      }
    },

    unsaveNews: (state, action: PayloadAction<SearchNewsType>) => {
      state.savedSearchNews = state.savedSearchNews.filter(
        (searchNews) => searchNews.web_url !== action.payload.web_url
      );
    },

    setSearchSavedNews: (state, action: PayloadAction<SearchNewsType[]>) => {
      state.savedSearchNews = action.payload;
    },

    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
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

        state.totalPages = action.payload.data.response.meta.hits;
        state.currentPage = action.meta.arg;
      })
      .addCase(fetchNewsIndonesia.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to fetch indonesia news";
      })

      // handle fetchNewsProgramming
      .addCase(fetchNewsProgramming.pending, (state) => {
        state.status = Status.LOADING;
        state.errorMessage = "";
      })
      .addCase(fetchNewsProgramming.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.searchNews = action.payload.data.response.docs;

        state.totalPages = action.payload.data.response.meta.hits;
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

        state.totalPages = action.payload.data.response.meta.hits;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(fetchNewsSearch.rejected, (state, action) => {
        state.status = Status.FAILED;
        state.errorMessage =
          action.error.message || "Failed to search for news.";
      });
  },
});

export const {
  savedSearchNews,
  unsaveNews,
  setCurrentPage,
  setSearchSavedNews,
} = searchNewSlice.actions;

export default searchNewSlice.reducer;
