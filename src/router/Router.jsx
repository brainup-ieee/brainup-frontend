// router
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// components
import { Navbar } from "../components/Navbar";

// pages
import { HomePage } from "../pages/home/Index";
import { RegisterPage } from "../pages/register/Index";

const Layout = ({ children }) => {
  return (
    <div className="xs:px-3 md:px-6 xl:px-10">
      <Navbar />
      <Outlet />
    </div>
  );
};

export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};
