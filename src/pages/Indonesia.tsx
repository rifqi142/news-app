import { FC, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsIndonesia } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";
import { SearchNewsType } from "../types/type";
import {
  savedSearchNews,
  setSearchSavedNews,
} from "../features/news/newsSearchSlice";
import { Status } from "../utils/status";
import { useLocation } from "react-router-dom";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";

const Indonesia: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    searchNewsIndonesia,
    status,
    errorMessage,
    totalPages,
    currentPageIndonesia,
  } = useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPageIndonesia || 0);

  useEffect(() => {
    if (status === Status.LOADING) return;
    if (searchNewsIndonesia.length === 0 || page !== currentPageIndonesia) {
      dispatch(fetchNewsIndonesia(page - 1) as any);
    }
  }, [dispatch, searchNewsIndonesia.length, page, location.pathname]);

  useEffect(() => {
    setPage(currentPageIndonesia || 0);
  }, [currentPageIndonesia]);

  const handlePageChange = (pageNumber: number) => {
    if (status === "loading") return;
    setPage(pageNumber);
    dispatch(fetchNewsIndonesia(pageNumber) as any);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

      // Show toast notification
      toast.success("News saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

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

    // Show toast notification
    toast.success("News removed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

    dispatch(setSearchSavedNews(updatedArticles));
  };

  if (status === Status.LOADING) {
    return (
      <>
        <div className="p-5 animate-pulse">
          <div className="flex items-center justify-center text-center">
            <div className=" mr-4 h-8 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-2"></div>
          </div>
          <NewsCardSkeleton />
        </div>
      </>
    );
  }

  if (status === Status.FAILED) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-5xl xl:text-6xl font-bold mb-4 font-chomsky">
        Indonesia News
      </h1>
      <hr className="w-64 xl:w-80 mb-4 border-1 border-[#004581] dark:border-[#004581]" />
      {searchNewsIndonesia.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNewsIndonesia,
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

export default Indonesia;
