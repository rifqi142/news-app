import { RouteObject } from "react-router-dom";
import RootLayout from "./RootLayout/RootLayout";
import Home from "../pages/Home";
import Indonesia from "../pages/Indonesia";
import Programming from "../pages/Programming";
import Saved from "../pages/Saved";

const Routes = (): RouteObject[] => {
  return [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "Indonesia", element: <Indonesia /> },
        { path: "Programming", element: <Programming /> },
        { path: "Saved", element: <Saved /> },
      ],
    },
  ];
};

export default Routes;
