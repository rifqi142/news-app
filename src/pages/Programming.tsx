import { FC, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsProgramming } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";
import { SearchNewsType } from "../types/type";
import {
  savedSearchNews,
  setSearchSavedNews,
} from "../features/news/newsSearchSlice";
import { Status } from "../utils/status";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";

const Programming: FC = () => {
  const dispatch = useDispatch();

  const {
    searchNewsProgramming,
    status,
    errorMessage,
    totalPages,
    currentPageProgramming,
  } = useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPageProgramming || 0);

  useEffect(() => {
    if (searchNewsProgramming.length === 0) {
      dispatch(fetchNewsProgramming(page - 1) as any);
    }
  }, [dispatch, searchNewsProgramming.length, page]);

  useEffect(() => {
    setPage(currentPageProgramming || 0);
  }, [currentPageProgramming]);

  const handlePageChange = (pageNumber: number) => {
    if (status === "loading") return;
    setPage(pageNumber);
    dispatch(fetchNewsProgramming(pageNumber) as any);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveNews = (data: SearchNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("savedNews") || "[]"
    );

    const isAlreadySaved = storedSavedNews.some(
      (news: SearchNewsType) => news.web_url === data.web_url
    );

    if (!isAlreadySaved) {
      storedSavedNews.push(data);
      localStorage.setItem("savedNews", JSON.stringify(storedSavedNews));

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
      localStorage.getItem("savedNews") || "[]"
    );

    const updatedArticles = storedSavedNews.filter(
      (news: SearchNewsType) => news.web_url !== data.web_url
    );

    localStorage.setItem("savedNews", JSON.stringify(updatedArticles));

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
        <div className="p-5">
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
      <h1 className="text-4xl xl:text-6xl font-bold mb-4 font-chomsky dark:text-white">
        Monthly Programming News
      </h1>
      <hr className="w-3/4 xl:w-2/5 mb-4 border-1 border-[#004581] dark:border-gray-600" />
      {searchNewsProgramming.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNewsProgramming,
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
