import { FC } from "react";
import { SearchNewsType } from "../../../types/type";
import { Link } from "react-router-dom";
import noImage from "/assets/no-image.jpg";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewsCardProps {
  data: SearchNewsType;
  onSaved: (data: SearchNewsType) => void;
}

const NewsCardSearch: FC<NewsCardProps> = ({ data, onSaved }) => {
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
            alt={data.headline.main}
            className="w-full aspect-video object-cover"
          />
        </Link>
        {/* Bookmark Icon */}
        <button
          onClick={() => onSaved(data)}
          className="absolute top-2 right-2 bg-white rounded-full py-2 px-3 shadow-md "
        >
          <FontAwesomeIcon icon={regularBookmark} />
        </button>
      </div>

      {/* card article detail */}
      <div className="card-body px-5">
        <div className="mt-3">
          <Link
            to={data.web_url}
            target="_blank"
            className="hover:text-blue-600 hover:underline"
          >
            <h2 className="text-xl font-bold text-justify line-clamp-2 min-h-[3em]">
              {data.headline.main}
            </h2>
          </Link>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">
            <span className="text-red-600">{data.source}</span> <br />
            {formattedDate(data.pub_date)}
          </p>
        </div>
        <div className="mt-3 text-justify">
          {/* Membuat abstract selalu menggunakan 2 baris */}
          <p className="text-gray-500 text-sm mt-2 line-clamp-2 min-h-[3em]">
            {data.abstract}
          </p>
        </div>
        <div className="mt-5 pb-10 flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            <Link to={data.web_url} target="_blank">
              Read More
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCardSearch;
