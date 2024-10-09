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

  const { searchNews, status, errorMessage, totalPages, currentPage } =
    useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPage || 0);

  useEffect(() => {
    console.log("fetching news programming");
    console.log(searchNews.length);
    if (searchNews.length === 0) {
      dispatch(fetchNewsProgramming(page - 1) as any);
    }
  }, [dispatch, searchNews.length, page]);

  useEffect(() => {
    setPage(currentPage || 0);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (status === "loading") return;
    setPage(pageNumber);
    // setTimeout(() => {
    // });
    dispatch(fetchNewsProgramming(pageNumber) as any);
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
      <h1 className="text-4xl xl:text-6xl font-bold mb-4 font-chomsky">
        Monthly Programming News
      </h1>
      <hr className="w-3/4 xl:w-2/5 mb-4 border-1 border-[#004581] dark:border-[#004581]" />
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
