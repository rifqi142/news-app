import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice";
import searchNewSlice from "../features/news/newsSearchSlice";
import themeSlice from "../features/theme/themeSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    searchNews: searchNewSlice,
    theme: themeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
