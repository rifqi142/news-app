import { FC, useEffect, useState } from "react";
import { toast, Bounce } from "react-toastify";
import NewsCardCombineList from "../components/news/NewsCardCombineList";
import { CardCombineData } from "../types/type";
import NewsCardSkeleton from "../components/news/card/NewsCardSkeleton";
import { Status } from "../utils/status";

const SavedNews: FC = () => {
  const [savedNews, setSavedNews] = useState<CardCombineData[]>([]);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch saved news from localStorage on component mount
    try {
      const savedNewsFromStorage = JSON.parse(
        localStorage.getItem("savedNews") || "[]"
      );
      setSavedNews(savedNewsFromStorage);
      setStatus(Status.SUCCESS);
    } catch (error) {
      console.error("Failed to load saved news:", error);
      setErrorMessage("Failed to load saved news.");
      setStatus(Status.FAILED);
    }
  }, []);

  const handleUnSaved = (data: CardCombineData) => {
    // Update saved news by removing the unsaved news item
    const updatedNews = savedNews.filter(
      (news) => news.url !== data.url || news.web_url !== data.web_url
    );
    localStorage.setItem("savedNews", JSON.stringify(updatedNews));
    setSavedNews(updatedNews);

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
  };

  if (status === Status.LOADING) {
    return (
      <div className="p-5">
        <div className="flex items-center justify-center text-center">
          <div className="mr-4 h-8 bg-gray-300 dark:bg-gray-700 rounded w-40 mb-2"></div>
        </div>
        <NewsCardSkeleton />
      </div>
    );
  }

  if (status === Status.FAILED) {
    return <p className="text-red-500">Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-5xl xl:text-6xl font-bold mb-4 font-chomsky dark:text-white">
        Bookmarked News
      </h1>
      <hr className="w-64 xl:w-96 mb-4 border-1 border-[#004581] dark:border-gray-600" />
      {savedNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src="/assets/image-not-found.svg"
            alt="No saved news"
            className="w-52 xl:w-72 h-52 xl:h-72"
          />
          <h1 className="text-2xl font-bold dark:text-white">
            No saved news found!
          </h1>
        </div>
      ) : (
        <NewsCardCombineList
          api={{
            response: {
              results: savedNews,
            },
          }}
          onSaved={() => {}}
          onUnSaved={handleUnSaved}
        />
      )}
    </div>
  );
};

export default SavedNews;
