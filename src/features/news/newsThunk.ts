import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { subMonths, format } from "date-fns";

export const fetchAllNews = createAsyncThunk(
  "news/fetchAllNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NEWS_BASE_URL}?api-key${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewsIndonesia = createAsyncThunk(
  "news/fetchNewsIndonesia",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NEWS_SEARCH_URL}?q=indonesia&api-key${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get data last 1 month
export const fetchNewsProgramming = createAsyncThunk(
  "news/fetchNewsProgramming",
  async (_, { rejectWithValue }) => {
    const dateNow = new Date();
    const dateLastMonth = subMonths(dateNow, 1);

    const dateNowFormat = format(dateNow, "yyyy-MM-dd");
    const dateLastMonthFormat = format(dateLastMonth, "yyyy-MM-dd");

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_NEWS_SEARCH_URL
        }?q=programming&begin_date=${dateNowFormat}&end_date=${dateLastMonthFormat}&api-key=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// fetch data from input search
export const fetchNewsSearch = createAsyncThunk(
  "news/fetchNewsSearch",
  async (search: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NEWS_SEARCH_URL}?q=${search}&api-key${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
