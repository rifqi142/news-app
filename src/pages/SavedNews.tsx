import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewsCardAllList from "../components/news/NewsCardAllList";
import { setSavedNews } from "../features/news/newsSlice";
import { AllNewsType } from "../types/type";

const SavedNews: FC = () => {
  const dispatch = useDispatch();
  const { savedNews } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("saved-news") || "[]"
    );

    dispatch(setSavedNews(savedNewsFromStorage));
  }, [dispatch]);

  const handleUnSaved = (data: AllNewsType) => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("saved-news") || "[]"
    );
    const updatedNews = savedNewsFromStorage.filter(
      (news: AllNewsType) => news.url !== data.url
    );
    localStorage.setItem("saved-news", JSON.stringify(updatedNews));

    dispatch(setSavedNews(updatedNews));
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Saved News</h1>
      {savedNews.length > 0 ? (
        <NewsCardAllList
          api={{
            response: {
              results: savedNews,
            },
          }}
          onSaved={() => {}}
          onUnSaved={handleUnSaved}
        />
      ) : (
        <p>No saved news available.</p>
      )}
    </div>
  );
};

export default SavedNews;
