import { FC, useEffect, useState } from "react";
import { CardCombineData } from "../../../types/type";
import { Link } from "react-router-dom";
import noImage from "/assets/no-image.jpg";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowRight } from "@phosphor-icons/react";

interface NewsCardProps {
  data: CardCombineData;
  onSaved: (data: CardCombineData) => void;
  onUnSaved: (data: CardCombineData) => void;
}

const NewsCardCombine: FC<NewsCardProps> = ({ data, onSaved, onUnSaved }) => {
  const iconPeople = "/assets/icon-people.png";
  const iconCalendar = "/assets/icon-calendar.png";
  const iconHashtag = "/assets/icon-hashtag.png";

  const formattedDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");
    const articleIsSaved = savedNews.some((news: CardCombineData) => {
      // Periksa berdasarkan URL atau web_url
      return (
        (news.url && news.url === data.url) ||
        (news.web_url && news.web_url === data.web_url)
      );
    });
    setIsSaved(articleIsSaved);
  }, [data]);

  const handleBookmarkClick = () => {
    setIsSaved((prev) => !prev);
    const savedNews = JSON.parse(localStorage.getItem("savedNews") || "[]");

    if (isSaved) {
      const updatedArticles = savedNews.filter((news: CardCombineData) => {
        return (
          (news.url && news.url !== data.url) ||
          (news.web_url && news.web_url !== data.web_url)
        );
      });
      localStorage.setItem("savedNews", JSON.stringify(updatedArticles));
      onUnSaved(data);
    } else {
      savedNews.push(data);
      localStorage.setItem("savedNews", JSON.stringify(savedNews));
      onSaved(data);
    }
  };

  return (
    <div className="max-w-sm bg-white dark:bg-[#1E2732] rounded-lg shadow-xl overflow-hidden relative mb-5">
      {/* Image with bookmark */}
      <div className="relative">
        <Link to={data.url || data.web_url || "/"} target="_blank">
          <img
            src={
              data.multimedia && data.multimedia.length > 0
                ? data.multimedia[0].url.startsWith("http")
                  ? data.multimedia[0].url
                  : `http://www.nytimes.com/${data.multimedia[0].url}`
                : noImage
            }
            alt={data.title || data.headline.main || "No title available"}
            className="w-full aspect-video object-cover"
          />
        </Link>

        {/* Bookmark Icon */}
        <button
          onClick={handleBookmarkClick}
          className="absolute top-2 right-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-full py-2 px-3 shadow-md"
        >
          <FontAwesomeIcon icon={isSaved ? solidBookmark : regularBookmark} />
        </button>
      </div>

      {/* Card news detail */}
      <div className="card-body px-5">
        <div className="mt-3">
          <Link
            to={data.url || data.web_url || "/"}
            target="_blank"
            className="hover:text-[#018ABD] hover:underline dark:hover:text-[#66D9E8]"
          >
            <h2 className="text-xl font-bold text-justify line-clamp-2 min-h-[3em] text-black dark:text-white">
              {data.title
                ? data.title
                : data.headline?.main
                ? data.headline.main
                : "No title"}
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
              <p className="text-sm text-[#004581] font-bold dark:text-[#66D9E8] flex items-center justify-center">
                <span className="bg-gray-200 dark:bg-gray-700">
                  #
                  {data.section || data.section_name
                    ? data.section || data.section_name
                    : "No Tags"}{" "}
                  - {data.source ? data.source : "No Source"}
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
              <p className="text-sm min-h-[3em] flex items-center justify-center">
                <span className="text-red-600 dark:text-white">
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
              <p className="text-gray-500 dark:text-gray-200 text-sm flex items-center justify-center">
                {data.published_date || data.pub_date
                  ? formattedDate(data.published_date || data.pub_date || "")
                  : "No Date"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 text-justify">
          <p className="text-gray-500 dark:text-gray-200 text-sm mt-2 line-clamp-2 min-h-[3em]">
            {data.abstract ? data.abstract : "No description"}
          </p>
        </div>
        <div className="mt-5 pb-10 flex justify-end">
          <button className="bg-[#018ABD] text-white py-2 px-4 rounded-md hover:bg-[#004581] dark:bg-[#004581] dark:hover:bg-[#003f5a] flex items-center">
            <Link
              to={data.url || data.web_url || "/"}
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

export default NewsCardCombine;
