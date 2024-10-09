import { FC, useEffect } from "react";
import { toast, Bounce } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAllNews } from "../features/news/newsThunk";
import { savedNews, setSavedNews } from "../features/news/newsSlice";
import NewsCardList from "../components/news/NewsCardAllList";
import NewsPagination from "../components/news/NewsPagination";
import { AllNewsType } from "../types/type";
import { setCurrentPage } from "../features/news/newsSlice";
import { Status } from "../utils/status";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";

const Home: FC = () => {
  const dispatch = useDispatch();

  const { news, status, errorMessage, totalPages, currentPage } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    console.log("fetching news home");
    if (news.length === 0) {
      dispatch(fetchAllNews({ offset: ((currentPage ?? 1) - 1) * 20 }) as any);
    }
  }, [dispatch, currentPage, news.length]);

  const handlePageChange = (newPage: number) => {
    newPage += 1;
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchAllNews({ offset: (newPage - 1) * 20 }) as any);
      dispatch(setCurrentPage(newPage));

      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSaveNews = (data: AllNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("savedNews") || "[]"
    );

    const isAlreadySaved = storedSavedNews.some(
      (news: AllNewsType) => news.url === data.url
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

      dispatch(savedNews(data));
    }
  };

  const handleUnSaveNews = (data: AllNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("savedNews") || "[]"
    );

    const updatedArticles = storedSavedNews.filter(
      (news: AllNewsType) => news.url !== data.url
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

    dispatch(setSavedNews(updatedArticles));
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
        Latest News
      </h1>
      <hr className="w-48 xl:w-60 mb-4 border-1 border-[#004581] dark:border-[#004581]" />
      {news.length > 0 ? (
        <>
          <NewsCardList
            api={{
              response: {
                results: news,
              },
            }}
            onSaved={handleSaveNews}
            onUnSaved={handleUnSaveNews}
          />

          {totalPages > 1 && (
            <NewsPagination
              page={currentPage ?? 1}
              handlePageChange={handlePageChange}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default Home;
