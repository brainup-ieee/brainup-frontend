// hooks
import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

// assets
import logo from "../assets/logos/Logo.png";
import avatar from "../assets/images/avatar.png";
import { Button } from "./Button";
import { BellIcon } from "./icons/bellIcon";

const PAGE = [1, 2, 3, 4];

const AuthToggle = () => {
  const [navigation, setNavigation] = useState(0);
  // const { userState } = useContext(AuthContext);
  useEffect(() => {
    const userType = localStorage.getItem("user-type");
    if (userType === "teacher") {
      setNavigation(1);
    } else if (userType === "student") {
      setNavigation(2);
    }
  }, []);

  return (
    <>
      {navigation === 0 ? (
        <div className="flex items-center gap-4 font-bold">
          <Link to="/signin">Sign in</Link>
          <Button link="/register" text="Register" />
        </div>
      ) : (
        <div className="flex items-center gap-4 font-bold">
          <BellIcon className="w-4 h-4" />
          <Link
            to={navigation === 1 ? "/teacher-dashboard" : "/student-dashboard"}
            className="w-12"
          >
            <img src={avatar} alt="user avatar" />
          </Link>
        </div>
      )}
    </>
  );
};

export const Navbar = () => {
  const currentURL = useLocation().pathname.toLowerCase();
  const [underline, setUnderline] = useState(null);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    switch (currentURL) {
      case "/":
        setUnderline(PAGE[0]);
        break;
      case "/about":
        setUnderline(PAGE[1]);
        break;
      case "/pricing":
        setUnderline(PAGE[2]);
        break;
      case "/contact":
        setUnderline(PAGE[3]);
        break;
      default:
        setUnderline(null);
        break;
    }
  }, [currentURL]);

  const handleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <nav className="flex justify-between items-center pt-4 pb-2 font-nunito">
      <Link to="/" className="flex items-center gap-4 h-10">
        <div
          className="flex flex-col items-center gap-1 lg:hidden"
          onClick={handleMenu}
        >
          <span
            className={
              "w-6 h-1 bg-primary rounded-xl transition-all duration-200 ease-cubic " +
              (activeMenu ? " rotate-45 translate-y-2" : "")
            }
          ></span>
          <span
            className={
              "w-6 h-1 bg-primary rounded-xl transition-all duration-200 ease-cubic " +
              (activeMenu ? "w-0" : "")
            }
          ></span>
          <span
            className={
              "w-6 h-1 bg-primary rounded-xl transition-all duration-200 ease-cubic " +
              (activeMenu ? " -rotate-45 -translate-y-2" : "")
            }
          ></span>
        </div>
        <img src={logo} alt="BrainUp" className="h-full" />
      </Link>
      <ul className="flex gap-8 font-semibold">
        <li
          className={
            "py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " +
            (underline === PAGE[0] ? "before:w-1/4" : "before:w-0")
          }
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={
            "py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " +
            (underline === PAGE[1] ? "before:w-1/4" : "before:w-0")
          }
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className={
            "py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " +
            (underline === PAGE[2] ? "before:w-1/4" : "before:w-0")
          }
        >
          <Link to="/pricing">Pricing</Link>
        </li>
        <li
          className={
            "py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " +
            (underline === PAGE[3] ? "before:w-1/4" : "before:w-0")
          }
        >
          <Link to="/contact">Contact Us</Link>
        </li>
      </ul>
      <AuthToggle />
    </nav>
  );
};
