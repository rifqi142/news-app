const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src="/assets/image-not-found.svg"
        alt="Error"
        className="w-52 xl:w-72 h-52 xl:h-72"
      />
      <h1 className="text-2xl font-bold dark:text-white">
        {message || "Something went wrong! Please Try Again Later."}
      </h1>
    </div>
  );
};

export default ErrorMessage;
