import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewsCardAllList from "../components/news/NewsCardAllList";
import { setSavedNews } from "../features/news/newsSlice";
import { setSearchSavedNews } from "../features/news/searchSlice";
import { AllNewsType, SearchNewsType } from "../types/type";
import NewsCardSearchList from "../components/news/NewsCardSearchList";

const SavedNews: FC = () => {
  const dispatch = useDispatch();
  const { savedNews } = useSelector((state: RootState) => state.news);
  const { savedSearchNews } = useSelector(
    (state: RootState) => state.searchNews
  );

  useEffect(() => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("saved-news") || "[]"
    );

    dispatch(setSavedNews(savedNewsFromStorage));
  }, [dispatch]);

  // handle search saved news
  useEffect(() => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );

    dispatch(setSearchSavedNews(savedNewsFromStorage));
  }, [dispatch]);

  // Unsave news
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

  // unsaved search news
  const handleSearchUnSaved = (data: SearchNewsType) => {
    const savedNewsFromStorage = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );
    const updatedNews = savedNewsFromStorage.filter(
      (news: SearchNewsType) => news.web_url !== data.web_url
    );
    localStorage.setItem("search-saved-news", JSON.stringify(updatedNews));

    dispatch(setSearchSavedNews(updatedNews));
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="text-3xl font-bold mb-4 mt-5">Saved News</h1>

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
