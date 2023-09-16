// hooks
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

// assets
import logo from "../assets/logos/Logo.png";
import avatar from "../assets/images/avatar.png";
import { Button } from "./Button";
import { BellIcon } from "./icons/BellIcon";

const AuthToggle = () => {
  const [navigation, setNavigation] = useState(0);

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
  return (
    <nav className="flex justify-between items-center pt-4 pb-2 font-nunito">
      <Link to="/" className="flex items-center gap-4 h-10">
        <img src={logo} alt="BrainUp" className="h-full" />
      </Link>
      <AuthToggle />
    </nav>
  );
};
