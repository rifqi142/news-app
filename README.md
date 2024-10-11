# 📜 Final Project - News App 📜

A News application that provides the latest updates using the [New York Times API](https://developer.nytimes.com/). News App is a web application that displays the latest news from various categories by leveraging the **New York Times API**. This app is built using modern technologies such as **React**, **Redux**, and **Tailwind CSS**. With the News App, users can explore different news categories, search for articles, bookmark their favorite news, and enjoy a user-friendly interface with both dark and light modes.

## 🧑🏻‍💻 Author

- [@Muhammad Rifqi Setiawan](https://github.com/rifqi142)

## 🌐 Preview Website

[![Preview](./public/assets/live-preview.gif)](./public/assets/live-preview.gif)

## 📋 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Installation](#installation)
- [Usage](#usage)

## ⚡️ Features

- **Dark Mode / Light Mode**: Users can switch between dark and light themes.
- **Pagination**: Navigate through multiple pages of news articles.
- **Responsive Design**: The app is fully responsive for mobile, tablet, and desktop screens.
- **Skeleton Design**: Display skeleton loaders while the content is being fetched.
- **Bookmark / Un-bookmark News**: Users can save or remove news articles from their bookmarks.
- **Scroll Up to Top**: Button to scroll up to the top of the page for better UX.

## ⚙️Technologies Used

- **React + Vite + TypeScript**: Frontend framework for building interactive UIs.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router Dom**: Library for managing routing in the React app.
- **React Redux**: State management library.
- **Redux Toolkit**: A toolset for efficient Redux development.
- **Shadcn/UI**: Component library for building beautiful UIs.
- **Axios**: Promise-based HTTP client for making API requests.
- **React-Toastify**: Library for showing notifications in the app.

## 📒 Icon Libraries

- **@fortawesome**: FontAwesome icons for UI elements.
- **@phosphor-icons/react**: Phosphor icons for better design options.

## 📝 API Integration

This app uses the New York Times API for fetching the latest news articles. You can register and get your API key [here](https://developer.nytimes.com/).

## 📌 Example .env

```
VITE_NEWS_API_KEY="your api key"
VITE_NEWS_BASE_URL=https://api.nytimes.com/svc/news/v3/content/all/all.json
VITE_NEWS_SEARCH_URL=https://api.nytimes.com/svc/search/v2/articlesearch.json
```

- VITE_NEWS_API_KEY: The API key obtained from the NY Times Developer Portal.
- VITE_NEWS_BASE_URL: The base URL endpoint to get news from various categories.
- VITE_NEWS_SEARCH_URL: The URL endpoint to perform article searches based on keywords.

### Example API Endpoints:

- **Fetching all news articles**:
  ```typescript
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
  ```
- **Fetching News API**

```typescript
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
```

- **Fetching News Programming**

```typescript
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
```

- **Fetching News by Keyword**

```typescript
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
```

## 📑 Project Structure

```
/src
 ├── /assets          # Static assets like images, fonts, etc.
 ├── /components      # Reusable components across the app
 ├── /constants       # Application-wide constants
 ├── /features        # Redux slices and logic
 ├── /lib             # Third-party integrations or utilities
 ├── /pages           # Application pages (Home, Indonesia, Programming, etc.)
 ├── /routes          # React Router configuration
 ├── /store           # Redux store and slices
 ├── /types           # TypeScript types
 ├── /utils           # Utility functions and helpers
 ├── App.tsx          # Main app component
 ├── index.css        # Global CSS
 └── main.tsx         # Main entry point for the React app
```

## 🛠 Installation

### 1. Clone the repository:

```bash
git clone https://github.com/rifqi142/news-app
```

### 2. Navigate to the project directory:

```bash
cd news-app
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Set up Environment Variables

Create a .env file in the root directory and add the required environment variables (refer to the Environment Variables section above).

### 5. Run the application:

```bash
npm run dev
```

## 🔗 Live Preview

Check out my news-app website at https://news-app-gules-ten.vercel.app/
