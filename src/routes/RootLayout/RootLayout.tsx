import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ScrollUpButton from "../../components/ScrollUpButton";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollUpButton />
    </>
  );
};

export default RootLayout;
