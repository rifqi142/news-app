import NewsCardCombine from "./card/NewsCardCombine";
import { CardCombineData } from "../../types/type";

type NewsCardCombineListProps = {
  api: {
    response: {
      results: CardCombineData[];
    };
  };
  onSaved: (data: CardCombineData) => void;
  onUnSaved: (data: CardCombineData) => void;
};

const NewsCardCombineList = ({
  api,
  onSaved,
  onUnSaved,
}: NewsCardCombineListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {api.response?.results && api.response.results.length > 0 ? (
        api.response.results.map((article, index: number) => (
          <NewsCardCombine
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

export default NewsCardCombineList;
