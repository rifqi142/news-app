import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsSearch } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";
import { SearchNewsType } from "../types/type";
import {
  savedSearchNews,
  setSearchSavedNews,
} from "../features/news/newsSearchSlice";
import { Status } from "../utils/status";
import { useParams, useNavigate } from "react-router-dom";

const SearchPage: FC = () => {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchNews, status, errorMessage, totalPages, currentPage } =
    useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPage ?? 0 > 0 ? currentPage : 1);

  const formattedKeyword = keyword?.replace(/%20/g, "+");

  useEffect(() => {
    if (keyword?.includes("%20")) {
      navigate(`/search/${formattedKeyword}`, { replace: true });
    }
  }, [keyword, formattedKeyword, navigate]);

  useEffect(() => {
    if (formattedKeyword) {
      dispatch(
        fetchNewsSearch({ keyword: formattedKeyword, page: page || 1 }) as any
      );
    }
  }, [formattedKeyword, page]);

  useEffect(() => {
    if (currentPage ?? 0 > 0) {
      setPage(currentPage);
    } else {
      setPage(1);
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    if (status === Status.LOADING) return;
    setPage(pageNumber);
  };

  const handleSaveNews = (data: SearchNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("searchSavedNews") || "[]"
    );

    const isAlreadySaved = storedSavedNews.some(
      (news: SearchNewsType) => news.web_url === data.web_url
    );

    if (!isAlreadySaved) {
      storedSavedNews.push(data);
      localStorage.setItem("searchSavedNews", JSON.stringify(storedSavedNews));
      dispatch(savedSearchNews(data));
    }
  };

  const handleUnSaveNews = (data: SearchNewsType) => {
    const storedSavedNews = JSON.parse(
      localStorage.getItem("searchSavedNews") || "[]"
    );

    const updatedArticles = storedSavedNews.filter(
      (news: SearchNewsType) => news.web_url !== data.web_url
    );

    localStorage.setItem("searchSavedNews", JSON.stringify(updatedArticles));
    dispatch(setSearchSavedNews(updatedArticles));
  };

  if (status === Status.LOADING) {
    return <p>Loading...</p>;
  }

  if (status === Status.FAILED) {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for {formattedKeyword}
      </h1>

      {searchNews.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNews,
              },
            }}
            onSaved={handleSaveNews}
            onUnSaved={handleUnSaveNews}
          />
          <NewsPagination
            page={page || 1}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default SearchPage;
