import { FC, useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewsCardAllList from "../components/news/NewsCardAllList";
import { setSavedNews } from "../features/news/newsSlice";
import { setSearchSavedNews } from "../features/news/newsSearchSlice";
import { AllNewsType, SearchNewsType } from "../types/type";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";
import { Status } from "../utils/status";

const SavedNews: FC = () => {
  const dispatch = useDispatch();
  const { savedNews, status, errorMessage } = useSelector(
    (state: RootState) => state.news
  );
  const { savedSearchNews } = useSelector(
    (state: RootState) => state.searchNews
  );

  useEffect(() => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("saved-news") || "[]"
    );

    dispatch(setSavedNews(savedNewsFromStorage));
  }, [dispatch]);

  useEffect(() => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );

    dispatch(setSearchSavedNews(savedNewsFromStorage));
  }, [dispatch]);

  const handleUnSaved = (data: AllNewsType) => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("saved-news") || "[]"
    );
    const updatedNews = savedNewsFromStorage.filter(
      (news: AllNewsType) => news.url !== data.url
    );
    localStorage.setItem("saved-news", JSON.stringify(updatedNews));

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

    dispatch(setSavedNews(updatedNews));
  };

  const handleSearchUnSaved = (data: SearchNewsType) => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );
    const updatedNews = savedNewsFromStorage.filter(
      (news: SearchNewsType) => news.web_url !== data.web_url
    );
    localStorage.setItem("search-saved-news", JSON.stringify(updatedNews));

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

    dispatch(setSearchSavedNews(updatedNews));
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
      <h1 className="text-5xl xl:text-6xl font-bold mb-4 font-chomsky">
        Bookmarked News
      </h1>
      <hr className="w-64 xl:w-96 mb-4 border-1 border-[#004581] dark:border-[#004581]" />
      {savedNews.length === 0 && savedSearchNews.length === 0 ? (
        <p>No saved news available.</p>
      ) : (
        <>
          {savedNews.length > 0 && (
            <NewsCardAllList
              api={{
                response: {
                  results: savedNews,
                },
              }}
              onSaved={() => {}}
              onUnSaved={handleUnSaved}
            />
          )}
          {savedSearchNews.length > 0 && (
            <NewsCardSearchList
              api={{
                response: {
                  docs: savedSearchNews,
                },
              }}
              onSaved={() => {}}
              onUnSaved={handleSearchUnSaved}
            />
          )}
        </>
      )}
    </div>
  );
};

export default SavedNews;
