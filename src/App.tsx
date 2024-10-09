import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for Toast notifications
import Routes from "./routes/Routes";

const App: FC = () => {
  const appRoutes = useRoutes(Routes());

  return (
    <>
      {appRoutes}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default App;
