import { useContext } from "react";
import { AuthContext } from "../contexts/authAlert";

export const ErrorAlert = () => {
  const { authAlert } = useContext(AuthContext);
  return (
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 top-4 bg-primary text-white text-center rounded-lg transition-opacity duration-300 ease-cubic " +
        (authAlert.show ? "px-3 py-1 opacity-100" : "opacity-0")
      }
    >
      {authAlert.message}
    </div>
  );
};
