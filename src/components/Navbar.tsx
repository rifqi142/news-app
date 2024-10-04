import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { navbarLinks } from "../constants";
import InputSearch from "./InputSearch";

const Navbar: FC = () => {
  const { news } = useSelector((state: RootState) => state.news);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isNavbarShadow, setIsNavbarShadow] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("");

  const location = useLocation();

  const logoNews = "/assets/news-logo.svg";
  const burgerMenu = "/assets/icon-menu.svg";

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsNavbarShadow(true);
    } else {
      setIsNavbarShadow(false);
    }
  };

  const handleLinkClick = (linkKey: string) => {
    setActiveLink(linkKey);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="navbar bg-[#1D2124]">
      <nav
        className={`py-1 md:py-2 px-4 xl:px-10 top-0 w-full z-50 sticky transition-shadow duration-300 ${
          isNavbarShadow ? "shadow-lg" : ""
        }`}
        id="navbar"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-row items-center">
            <Link to="/" className=" flex items-center gap-1">
              <img
                src={logoNews}
                alt="news-logo"
                className="w-14 h-14 cursor-pointer"
              />
              <span className="text-xl lg:text-2xl font-bold text-white hidden md:block">
                R News
              </span>
            </Link>
          </div>

          <div className="flex-grow hidden lg:flex justify-center">
            <ul className="flex gap-4 text-white">
              {navbarLinks.map((link) => (
                <li className="group relative" key={link.key}>
                  <Link
                    to={link.path}
                    onClick={() => handleLinkClick(link.key)}
                    className={`text-xl md:text-lg font-bold pb-1.5 transition-all duration-300 hover:text-blue-500 ${
                      activeLink === link.key ? "text-blue-500" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                  <span
                    className={`block h-[2px] bg-blue-500 absolute bottom-0 left-0 transition-all duration-300 ${
                      activeLink === link.key
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </li>
              ))}
            </ul>
          </div>

          <InputSearch />
          {/* Burger Menu for mobile view */}
          <div className="lg:hidden">
            <img
              src={burgerMenu}
              alt="burger-menu"
              className="w-6 h-6 cursor-pointer"
              onClick={toggleMobileMenu}
            />
          </div>
        </div>
        <ul
          className={`lg:hidden relative left-0 w-full text-white transition-all duration-300 ease-in-out  z-50 ${
            isMobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          }`}
          style={{ display: isMobileMenuOpen ? "block" : "none" }}
        >
          {navbarLinks.map((link) => (
            <li
              className="py-2 font-bold group relative"
              key={link.key}
              onClick={() => handleLinkClick(link.key)}
            >
              <Link
                to={link.path}
                className={`block left-0 w-full text-white transition-all duration-300 ease-in-out px-5 z-50 ${
                  activeLink === link.key ? "text-blue-500" : ""
                }`}
              >
                {link.label}
              </Link>
              <span
                className={`block h-[2px] bg-blue-500 absolute bottom-0 left-0 transition-all duration-300 ${
                  activeLink === link.key ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
