import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchNewsIndonesia } from "../features/news/newsThunk";
import NewsCardSearchList from "../components/news/NewsCardSearchList";
import NewsPagination from "../components/news/NewsPagination";

const Indonesia: FC = () => {
  const dispatch = useDispatch();

  const { searchNews, status, errorMessage, totalPages, currentPage } =
    useSelector((state: RootState) => state.searchNews);

  const [page, setPage] = useState(currentPage || 0);

  useEffect(() => {
    if (status === "idle" || page !== currentPage) {
      dispatch(fetchNewsIndonesia(page + 1) as any);
    }
  }, [dispatch, page, currentPage, status]);

  const handlePageChange = (pageNumber: number) => {
    if (status === "loading") return;
    setPage(pageNumber);
    dispatch(fetchNewsIndonesia(pageNumber + 1) as any);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {errorMessage}</p>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <h1 className="text-3xl font-bold mb-4">Indonesia News</h1>
      {searchNews.length > 0 ? (
        <>
          <NewsCardSearchList
            api={{
              response: {
                docs: searchNews,
              },
            }}
            onSaved={() => {}}
          />
          <NewsPagination
            page={page}
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

export default Indonesia;
