import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsProgramming } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";
import { SearchNewsType } from "../types/type";
import {
  savedSearchNews,
  setSearchSavedNews,
} from "../features/news/searchSlice";
import { Status } from "../utils/status";

const Programming: FC = () => {
  const dispatch = useDispatch();

  const { searchNews, status, errorMessage, totalPages, currentPage } =
    useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPage || 0);

  useEffect(() => {
    if (searchNews.length === 0 || page !== currentPage) {
      dispatch(fetchNewsProgramming(page - 1) as any);
    }
  }, [dispatch, searchNews.length, page]);

  useEffect(() => {
    setPage(currentPage || 0);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (status === "loading") return;
    setPage(pageNumber);
    dispatch(fetchNewsProgramming(pageNumber - 1) as any);
  };

  const handleSaveNews = (data: SearchNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("searchSavedNews") || "[]"
    );

    const isAlreadySaved = storedSavedNews.some(
      (news: SearchNewsType) => news.web_url === data.web_url
    );

    if (!isAlreadySaved) {
      storedSavedNews.push(data);
      localStorage.setItem("searchSavedNews", JSON.stringify(storedSavedNews));
      dispatch(savedSearchNews(data));
    }
  };

  const handleUnSaveNews = (data: SearchNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("searchSavedNews") || "[]"
    );

    const updatedArticles = storedSavedNews.filter(
      (news: SearchNewsType) => news.web_url !== data.web_url
    );

    localStorage.setItem("searchSavedNews", JSON.stringify(updatedArticles));
    dispatch(setSearchSavedNews(updatedArticles));
  };

  if (status === Status.LOADING) {
    return <p>Loading...</p>;
  }

  if (status === Status.FAILED) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Programming Last 30 Day News</h1>
      {searchNews.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNews,
              },
            }}
            onSaved={handleSaveNews}
            onUnSaved={handleUnSaveNews}
          />
          <NewsPagination
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default Programming;
