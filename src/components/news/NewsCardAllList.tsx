import NewsCardAll from "./card/NewsCardAll";
import { AllNewsType } from "../../types/type";

type NewsCardAllListProps = {
  api: {
    response: {
      results: AllNewsType[];
    };
  };
  onSaved: (data: AllNewsType) => void;
  onUnSaved: (data: AllNewsType) => void;
};

const NewsCardAllList = ({ api, onSaved, onUnSaved }: NewsCardAllListProps) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.response?.results && api.response.results.length > 0 ? (
        api.response.results.map((article, index: number) => (
          <NewsCardAll
            key={index}
            data={article}
            onSaved={onSaved}
            onUnSaved={onUnSaved}
          />
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsCardAllList;
