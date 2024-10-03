import { useEffect, useRef, useState } from "react";

const ScrollUpButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleBorder = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

      if (circleBorder.current) {
        circleBorder.current.style.strokeDashoffset = `${100 - scrollPercent}`;
      }

      setIsVisible(scrollPercent > 10);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      id="scrollUpBtn"
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-transparent border-4 border-red-500 p-1 ${
        isVisible ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="text-red-500 w-full h-full"
        ref={circleBorder}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  );
};

export default ScrollUpButton;
