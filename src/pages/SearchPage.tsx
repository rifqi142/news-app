import { FC, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsSearch } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";
import { SearchNewsType } from "../types/type";
import {
  savedSearchNews,
  setSearchSavedNews,
} from "../features/news/newsSearchSlice";
import { Status } from "../utils/status";
import { useParams } from "react-router-dom";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";

const SearchPage: FC = () => {
  const { keyword } = useParams<{ keyword: string }>();

  const dispatch = useDispatch();

  const {
    searchNewsSearch,
    status,
    errorMessage,
    totalPages,
    currentPageSearch,
  } = useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPageSearch || 0);

  useEffect(() => {
    if (status === Status.LOADING) return;

    if (keyword) {
      setPage(page);
      console.log(page);
      dispatch(
        fetchNewsSearch({
          keyword: keyword,
          page: 0,
        }) as any
      );
    }
  }, [dispatch, keyword]);

  useEffect(() => {
    if (status === Status.LOADING) return;
    if (searchNewsSearch.length === 0 || page !== currentPageSearch) {
      dispatch(
        fetchNewsSearch({
          keyword: keyword || "",
          page: page - 1,
        }) as any
      );
    }
  }, [dispatch, searchNewsSearch.length, page, keyword, currentPageSearch]);

  useEffect(() => {
    setPage(currentPageSearch || 0);
  }, [currentPageSearch]);

  const handlePageChange = (pageNumber: number) => {
    if (status === Status.LOADING) return;
    setPage(pageNumber);
    dispatch(
      fetchNewsSearch({
        keyword: keyword || "",
        page: pageNumber,
      }) as any
    );
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
      <h1 className="px-4 text-2xl xl:text-3xl font-bold mb-4 dark:text-white">
        Search Results for {keyword}
      </h1>

      {searchNewsSearch.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNewsSearch,
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

export default SearchPage;
