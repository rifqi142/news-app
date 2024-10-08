import { SearchNewsType } from "../../types/type";
import NewsCardSearch from "./card/NewsCardSearch";

type NewsCardSearchListProps = {
  api: {
    response: {
      docs: SearchNewsType[];
    };
  };
  onSaved: (data: SearchNewsType) => void;
  onUnSaved: (data: SearchNewsType) => void;
};

const NewsCardSearchList = ({
  api,
  onSaved,
  onUnSaved,
}: NewsCardSearchListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
      {api.response?.docs && api.response.docs.length > 0 ? (
        api.response.docs.map((article, index: number) => (
          <NewsCardSearch
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

export default NewsCardSearchList;
