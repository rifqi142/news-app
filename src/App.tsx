import { FC } from "react";
import { useRoutes } from "react-router-dom";
import Routes from "./routes/Routes";

const App: FC = () => {
  const appRoutes = useRoutes(Routes());
  return <>{appRoutes}</>;
};

export default App;
