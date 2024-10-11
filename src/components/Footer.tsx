const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#004581] dark:bg-[#0f191e] shadow-xl py-2 px-2 mt-auto">
      <div className="flex flex-row justify-center items-center">
        <p className="text-center">
          <span className="text-white">
            Made with ❤️ by Muhammad Rifqi Setiawan © {currentYear}
          </span>{" "}
          <span className="text-white">| News App.</span>
          <span className="text-gray-300"> version 1.0</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
