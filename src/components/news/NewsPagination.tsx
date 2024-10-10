import { NewsPaginationProps } from "../../types/type";

const NewsPagination = ({
  page,
  handlePageChange,
  totalPages,
}: NewsPaginationProps) => {
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    let startPage = Math.max(0, page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow);

    if (endPage - startPage < maxPagesToShow) {
      startPage = Math.max(0, endPage - maxPagesToShow);
    }

    return Array.from(
      { length: endPage - startPage },
      (_, idx) => startPage + idx
    );
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-1 xl:space-x-2 pb-10">
      {/* Previous Button */}
      <button
        className={`px-2 xl:px-4 py-2 text-sm font-medium border rounded-md 
          ${
            page === 0
              ? "text-gray-400 border-gray-300 cursor-not-allowed dark:text-gray-600 dark:border-gray-600"
              : "text-[#018ABD] border-[#018ABD] hover:bg-[#018ABD] hover:text-white dark:text-[#66D9E8] dark:border-[#66D9E8] hover:dark:bg-[#66D9E8] hover:dark:text-black"
          }`}
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 0}
      >
        Previous
      </button>
      {/* Render Page Numbers */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          className={`px-4 py-2 text-sm font-medium border rounded-md transition-all 
            ${
              pageNumber === page
                ? "bg-[#018ABD] text-white border-[#018ABD] dark:bg-[#66D9E8] dark:text-black"
                : "text-gray-700 border-gray-300 hover:bg-[#018ABD] hover:text-white dark:text-gray-300 dark:border-gray-600 hover:dark:bg-[#66D9E8] hover:dark:text-black"
            }`}
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber + 1}
        </button>
      ))}
      {/* Next Button */}
      <button
        className={`px-4 py-2 text-sm font-medium border rounded-md 
          ${
            page === totalPages - 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed dark:text-gray-600 dark:border-gray-600"
              : "text-[#018ABD] border-[#018ABD] hover:bg-[#018ABD] hover:text-white dark:text-[#66D9E8] dark:border-[#66D9E8] hover:dark:bg-[#66D9E8] hover:dark:text-black"
          }`}
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages - 1}
      >
        Next
      </button>
    </div>
  );
};

export default NewsPagination;
