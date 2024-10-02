import NewsCard from "./NewsCard";
import { NewsType } from "../types/type";

type NewsCardListProps = {
  api: {
    response?: {
      docs?: NewsType[];
    };
  };
  onSaved: (data: NewsType) => void;
};

const NewsCardList = ({ api, onSaved }: NewsCardListProps) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.response?.docs && api.response.docs.length > 0 ? (
        api.response.docs.map((article, index: number) => (
          <NewsCard key={index} data={article} onSaved={onSaved} />
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsCardList;
