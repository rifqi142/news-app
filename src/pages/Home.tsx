import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchAllNews } from "../features/news/newsThunk";
import NewsCardList from "../components/NewsCardList";
import { NewsType } from "../types/type";

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const { news, status, errorMessage } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllNews() as any);
    }
  }, [dispatch]);

  const handleSaveNews = (data: NewsType) => {
    console.log("Saved news:", data);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      {news.length > 0 ? (
        <NewsCardList
          api={{ response: { docs: news } }}
          onSaved={handleSaveNews}
        />
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default Home;
