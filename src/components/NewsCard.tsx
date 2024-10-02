import { FC } from "react";
import { NewsType } from "../types/type";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface NewsCardProps {
  data: NewsType;
  onSaved: (data: NewsType) => void;
}

const NewsCard: FC<NewsCardProps> = ({ data, onSaved }) => {
  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-us", options);
  };

  return (
    <Card className="w-[450px]">
      <CardContent>
        <div className="flex justify-between items-center">
          {data.multimedia.length > 0 && data.multimedia[0].url ? (
            <img
              src={data.multimedia[0].url}
              alt={data.source}
              className="w-20 h-20 object-cover rounded-md"
              typeof={data.multimedia[0].type}
            />
          ) : (
            <div className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}
          <h1 className="text-xl font-bold">{data.source}</h1>
          <button
            onClick={() => onSaved(data)}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
        <p className="text-sm text-gray-500">
          {formattedDate(data.published_date)}
        </p>
        <h1 className="text-lg font-bold mt-2">{data.abstract}</h1>
        <p className="text-sm mt-2">{data.load_paragraph}</p>
        <Button>
          <Link to={data.web_url} target="_blank">
            Read more
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
