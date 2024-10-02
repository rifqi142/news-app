import { SearchNewsType } from "../../types/type";
import NewsCardSearch from "./card/NewsCardSearch";

type NewsCardSearchListProps = {
  api: {
    response: {
      docs: SearchNewsType[];
    };
  };
  onSaved: (data: SearchNewsType) => void;
};

const NewsCardSearchList = ({ api, onSaved }: NewsCardSearchListProps) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-4">
      {api.response?.docs && api.response.docs.length > 0 ? (
        api.response.docs.map((article, index: number) => (
          <NewsCardSearch key={index} data={article} onSaved={onSaved} />
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default NewsCardSearchList;
