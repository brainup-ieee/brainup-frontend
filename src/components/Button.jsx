import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ link, text }) => {
  return (
    <Link
      to={link}
      className="w-fit px-4 py-2 bg-primary text-white rounded-lg transition-colors duration-200 ease-cubic hover:bg-primary-light"
    >
      {text}
    </Link>
  );
};
