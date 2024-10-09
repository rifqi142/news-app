import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    dark: true,
  },
  reducers: {
    saveTheme: (state, action) => {
      if (action.payload !== state.dark) {
        state.dark = action.payload;
      }
    },
  },
});

export const { saveTheme } = themeSlice.actions;
export default themeSlice.reducer;
