import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { subMonths, format } from "date-fns";

export const fetchAllNews = createAsyncThunk(
  "news/fetchAllNews",
  async ({ offset = 0 }: { offset?: number }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_NEWS_BASE_URL}?api-key=${
          import.meta.env.VITE_NEWS_API_KEY
        }&offset=${offset}&limit=20`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewsIndonesia = createAsyncThunk(
  "news/fetchNewsIndonesia",
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_NEWS_SEARCH_URL
        }?q=indonesia&page=${page}&api-key=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchNewsProgramming = createAsyncThunk(
  "news/fetchNewsProgramming",
  async (page: number = 1, { rejectWithValue }) => {
    const dateNow = new Date();
    const dateLastMonth = subMonths(dateNow, 1);

    const dateNowFormat = format(dateNow, "yyyyMMdd");
    const dateLastMonthFormat = format(dateLastMonth, "yyyyMMdd");

    try {
      const apiUrl = `${
        import.meta.env.VITE_NEWS_SEARCH_URL
      }?q=programming+OR+coding&page=${page}&begin_date=${dateLastMonthFormat}&end_date=${dateNowFormat}&api-key=${
        import.meta.env.VITE_NEWS_API_KEY
      }`;

      const response = await axios.get(apiUrl);

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// get search by 2 years ago
export const fetchNewsSearch = createAsyncThunk(
  "news/fetchNewsSearch",
  async (
    { keyword, page = 1 }: { keyword: string; page: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_NEWS_SEARCH_URL
        }?q=${keyword}&page=${page}&sort=newest&api-key=${
          import.meta.env.VITE_NEWS_API_KEY
        }`
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
