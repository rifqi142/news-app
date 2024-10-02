import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import NewsCardAllList from "../components/news/NewsCardAllList";

const SavedNews: FC = () => {
  const { savedNews } = useSelector((state: RootState) => state.news);

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
          onSaved={() => {}} // You can implement unsave functionality here if needed
        />
      ) : (
        <p>No saved news available.</p>
      )}
    </div>
  );
};

export default SavedNews;
