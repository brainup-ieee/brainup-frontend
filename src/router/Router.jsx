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
import { AboutPage } from "../pages/about/Index";
import { ContactPage } from "../pages/contact/Index";
import { PricingPage } from "../pages/pricing/Index";
import { RegisterPage } from "../pages/register/Index";
import { SigninPage } from "../pages/signin/Index";
import { VarificationPage } from "../pages/varify";

const Layout = ({ children }) => {
  return (
    <div className="xs:px-4 sm:px-8 md:px-10 lg:px-14 xl:px-20">
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
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="pricing" element={<PricingPage />} />
        </Route>
        <Route path="register" element={<RegisterPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="forgot-password" element={<VarificationPage />} />
        <Route path="user-confirm" element={<VarificationPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
};
