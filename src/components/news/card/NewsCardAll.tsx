import { FC, useEffect, useState } from "react";
import { AllNewsType } from "../../../types/type";
import { Link } from "react-router-dom";
import noImage from "/assets/no-image.jpg";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewsCardProps {
  data: AllNewsType;
  onSaved: (data: AllNewsType) => void;
}

const NewsCardAll: FC<NewsCardProps> = ({ data, onSaved }) => {
  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-us", options);
  };

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedNews = JSON.parse(sessionStorage.getItem("saved-news") || "[]");
    const articleIsSaved = savedNews.some(
      (news: AllNewsType) => news.url === data.url
    );
    setIsSaved(articleIsSaved);
  }, [data.url]);

  const handleBookmarkClick = () => {
    onSaved(data);

    setIsSaved((prev) => !prev);

    const savedNews = JSON.parse(sessionStorage.getItem("saved-news") || "[]");

    if (isSaved) {
      const updatedArticles = savedNews.filter(
        (news: AllNewsType) => news.url !== data.url
      );
      sessionStorage.setItem("saved-news", JSON.stringify(updatedArticles));
    } else {
      savedNews.push(data);
      sessionStorage.setItem("saved-news", JSON.stringify(savedNews));
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative">
      {/* Image with bookmark */}
      <div className="relative">
        <Link to={data.url} target="_blank">
          <img
            src={data.multimedia.length > 0 ? data.multimedia[0].url : noImage}
            alt={data.title}
            className="w-full aspect-video object-cover"
          />
        </Link>
        {/* Bookmark Icon */}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-2 right-2 bg-white rounded-full py-2 px-3 shadow-md"
        >
          <FontAwesomeIcon icon={isSaved ? solidBookmark : regularBookmark} />
        </button>
      </div>

      {/* Card news detail */}
      <div className="card-body px-5">
        <div className="mt-3">
          <Link
            to={data.url}
            target="_blank"
            className="hover:text-blue-600 hover:underline"
          >
            <h2 className="text-xl font-bold text-justify line-clamp-2 min-h-[3em]">
              {data.title}
            </h2>
          </Link>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">
            <span className="text-red-600">{data.source}</span> -{" "}
            {formattedDate(data.published_date)}
          </p>
        </div>
        <div className="mt-3 text-justify">
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[3em]">
            {data.abstract}
          </p>
        </div>
        <div className="mt-5 pb-10 flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            <Link to={data.url} target="_blank">
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardAll;
