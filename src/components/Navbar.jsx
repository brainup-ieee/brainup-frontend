// hooks
import { useEffect, useState } from "react";

// conponents
import { Link, useLocation } from "react-router-dom";

// assets
import logo from "../assets/logos/logo_temp.png";
import { Button } from "./Button";

const PAGE = [ 1, 2, 3, 4];

export const Navbar = () => {
  const currentURL = useLocation().pathname.toLowerCase();
  const [underline, setUnderline] = useState(null);

  useEffect(() => {
    if (currentURL === "/") {
      setUnderline(PAGE[0]);
    } else if (currentURL === "/about") {
      setUnderline(PAGE[1]);
    } else if (currentURL === "/pricing") {
      setUnderline(PAGE[2]);
    } else if (currentURL === "/contact") {
      setUnderline(PAGE[3]);
    } else {
      setUnderline(null);
    }
  }, [currentURL]);

  return (
    <nav className="flex justify-between items-center pt-4 pb-2 font-nunito">
      <Link to="/" className="flex h-8">
        <img src={logo} alt="BrainUp" />
        <span className="text-2xl font-bold text-primary translate-y-1">
          rainUp
        </span>
      </Link>
      <ul className="flex gap-8 font-semibold">
        <li className={"py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " + (underline === PAGE[0]? "before:w-1/4" : "before:w-0")}><Link to="/">Home</Link></li>
        <li className={"py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " + (underline === PAGE[1]? "before:w-1/4" : "before:w-0")}><Link to="/about">About</Link></li>
        <li className={"py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " + (underline === PAGE[2]? "before:w-1/4" : "before:w-0")}><Link to="/pricing">Pricing</Link></li>
        <li className={"py-1 relative transition-colors duration-200 ease-cubic before:absolute before:left-0 before:bottom-0 before:h-1 before:bg-primary before:rounded before:transition-all before:duration-200 before:ease-cubic hover:text-primary " + (underline === PAGE[3]? "before:w-1/4" : "before:w-0")}><Link to="/contact">Contact Us</Link></li>
      </ul>
      <div className="flex items-center gap-4 font-bold">
        <Link to="/signin">Sign in</Link>
        <Button link="/register" text="Register" />
      </div>
    </nav>
  );
};
