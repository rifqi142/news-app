import { FC, useEffect, useState } from "react";
import { SearchNewsType } from "../../../types/type";
import { Link } from "react-router-dom";
import noImage from "/assets/no-image.jpg";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight } from "@phosphor-icons/react";

interface NewsCardProps {
  data: SearchNewsType;
  onSaved: (data: SearchNewsType) => void;
  onUnSaved: (data: SearchNewsType) => void;
}

const NewsCardSearch: FC<NewsCardProps> = ({ data, onSaved, onUnSaved }) => {
  const iconPeople = "/assets/icon-people.png";
  const iconCalendar = "/assets/icon-calendar.png";
  const iconHashtag = "/assets/icon-hashtag.png";

  const [isSaved, setIsSaved] = useState(false);
  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-us", options);
  };

  useEffect(() => {
    const savedNews = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );
    const articleIsSaved = savedNews.some(
      (news: SearchNewsType) => news.web_url === data.web_url
    );
    setIsSaved(articleIsSaved);
  }, [data.web_url]);

  const handleBookmarkClick = () => {
    setIsSaved((prev) => !prev);

    const savedNews = JSON.parse(
      localStorage.getItem("search-saved-news") || "[]"
    );

    if (isSaved) {
      const updatedArticles = savedNews.filter(
        (news: SearchNewsType) => news.web_url !== data.web_url
      );
      localStorage.setItem(
        "search-saved-news",
        JSON.stringify(updatedArticles)
      );
      onUnSaved(data);
    } else {
      savedNews.push(data);
      localStorage.setItem("search-saved-news", JSON.stringify(savedNews));
      onSaved(data);
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative">
      {/* Image with bookmark */}
      <div className="relative">
        <Link to={data.web_url} target="_blank">
          <img
            src={
              data.multimedia.length > 0
                ? `http://www.nytimes.com/${data.multimedia[0].url}`
                : noImage
            }
            alt={data.headline.main ? data.headline.main : data.abstract}
            className="w-full aspect-video object-cover"
          />
        </Link>
        {/* Bookmark Icon */}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-2 right-2 bg-white rounded-full py-2 px-3 shadow-md "
        >
          <FontAwesomeIcon icon={isSaved ? solidBookmark : regularBookmark} />
        </button>
      </div>

      {/* card article detail */}
      <div className="card-body px-5">
        <div className="mt-3">
          <Link
            to={data.web_url}
            target="_blank"
            className="hover:text-[#018ABD] hover:underline"
          >
            <h2 className="text-xl font-bold text-justify line-clamp-2 min-h-[3em]">
              {data.headline.main ? data.headline.main : data.abstract}
            </h2>
          </Link>
        </div>
        <div className="mt-3">
          <div className="flex flex-row mt-2 xl:mt-1">
            <div className="flex items-center justify-center gap-2">
              <img
                src={iconHashtag}
                alt="icon-hashtag"
                className="w-5 h-5 inline-block"
              />
              <p className="text-sm text-[#004581] font-bold flex items-center justify-center">
                <span className="bg-gray-200">
                  #{data.section_name} - {data.source}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-row mt-2 xl:mt-1">
            <div className="flex items-center justify-center gap-2">
              <img
                src={iconPeople}
                alt="icon-people"
                className="w-6 h-6 inline-block"
              />
              <p className="text-gray-500 text-sm min-h-[3em] flex items-center justify-center">
                <span className="text-red-600">
                  {data.byline.original ? data.byline.original : "Anonymous"}{" "}
                  <br />
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-row mt-2 xl:mt-1">
            <div className="flex items-center justify-center gap-2">
              <img
                src={iconCalendar}
                alt="icon-calendar"
                className="w-6 h-6 inline-block"
              />
              <p className="text-gray-500 text-sm flex items-center justify-center">
                {formattedDate(data.pub_date)}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 text-justify">
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[3em]">
            {data.abstract}
          </p>
        </div>
        <div className="mt-5 pb-10 flex justify-end">
          <button className="bg-[#018ABD] text-white py-2 px-4 rounded-md hover:bg-[#004581] flex items-center">
            <Link
              to={data.web_url}
              target="_blank"
              className="flex items-center space-x-2"
            >
              <span>Read More</span>
              <ArrowRight />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSearch;
