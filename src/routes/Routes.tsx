import { RouteObject } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "../pages/Home";
import Indonesia from "../pages/Indonesia";
import Programming from "../pages/Programming";
import SavedNews from "../pages/SavedNews";
import SearchPage from "../pages/SearchPage";

const Routes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Indonesia", element: <Indonesia /> },
        { path: "Programming", element: <Programming /> },
        { path: "Bookmarks", element: <SavedNews /> },
        { path: "/search/:keyword", element: <SearchPage /> },
      ],
    },
  ];
};

export default Routes;
