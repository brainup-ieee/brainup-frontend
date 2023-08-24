import { Link } from "react-router-dom";

export const Button = ({ link, text }) => {
  return (
    <Link
      to="/register"
      className="w-fit px-4 py-2 bg-primary text-secondary-light rounded-lg transition-colors duration-200 ease-cubic hover:bg-primary-light"
    >
      {text}
    </Link>
  );
};
