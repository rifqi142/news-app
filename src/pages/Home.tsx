import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAllNews } from "../features/news/newsThunk";
import { savedNews, setSavedNews } from "../features/news/newsSlice";
import NewsCardList from "../components/news/NewsCardAllList";
import NewsPagination from "../components/news/NewsPagination";
import { AllNewsType } from "../types/type";
import { setCurrentPage } from "../features/news/newsSlice";

const Home: FC = () => {
  const dispatch = useDispatch();

  const { news, status, errorMessage, totalPages, currentPage } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchAllNews({ offset: ((currentPage ?? 1) - 1) * 20 }) as any);
    }
  }, [dispatch, currentPage, news.length]);

  const handlePageChange = (newPage: number) => {
    newPage += 1;
    console.log("currentPage", currentPage);
    console.log("newPage", newPage);
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchAllNews({ offset: (newPage - 1) * 20 }) as any);
      dispatch(setCurrentPage(newPage));
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
    dispatch(setSavedNews(updatedArticles));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
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
