const NewsCardSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 mt-5">
        {/* skeleton 1 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 2 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 3 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 4 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 5 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 6 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 7 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>

        {/* skeleton 8 */}
        <div className="max-w-sm bg-white rounded-lg shadow-xl overflow-hidden relative animate-pulse">
          {/* Skeleton Image */}
          <div className="relative">
            <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
                aria-hidden="true"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            {/* Skeleton Bookmark Icon */}
            <div className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 shadow-md"></div>
          </div>

          {/* Skeleton Card Body */}
          <div className="card-body px-5">
            {/* Skeleton Title */}
            <div className="mt-3 h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

            {/* Skeleton Source and Date */}
            <div className="mt-3 flex space-x-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>

            {/* Skeleton Abstract */}
            <div className="mt-3">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mt-2"></div>
            </div>

            {/* Skeleton Button */}
            <div className="mt-5 pb-10 flex justify-end">
              <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Pagination */}
      <div className="flex justify-center items-center mt-8 space-x-1 xl:space-x-2 pb-10">
        {/* Previous Button Skeleton */}
        <div className="px-2 xl:px-4 py-2 text-sm font-medium border rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse cursor-not-allowed"></div>

        {/* Render Page Numbers Skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="px-4 py-2 text-sm font-medium border rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse cursor-not-allowed"
          ></div>
        ))}

        {/* Next Button Skeleton */}
        <div className="px-4 py-2 text-sm font-medium border rounded-md bg-gray-300 dark:bg-gray-600 animate-pulse cursor-not-allowed"></div>
      </div>
    </>
  );
};

export default NewsCardSkeleton;
