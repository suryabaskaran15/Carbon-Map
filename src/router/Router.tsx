import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export enum ROUTES {
  HOME = "/",
}

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
