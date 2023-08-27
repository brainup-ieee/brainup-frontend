import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { ResetPasswordPage } from "./password/Index";
import { ConfrimEmailPage } from "./confirm/Index";

import logo from "../../assets/logos/Logo.png";

const INITIALSTATE = {
  text: "",
  value: "",
  placeholder: "",
  error: "",
};

export const VarificationPage = () => {
  // hooks
  const location = useLocation();
  const [pageFunction, setPageFunction] = useState(null);
  const [state, setState] = useState(INITIALSTATE);

  const pathname = location.pathname.slice(1);

  useEffect(() => {
    if (pathname === "forgot-password") {
      setPageFunction(1);
      setState((prevState) => ({
        ...prevState,
        text: "Email",
        value: "",
        placeholder: "Enter your email",
        error: "",
      }));
    } else if (pathname === "user-confirm") {
      setPageFunction(2);
      setState((prevState) => ({
        ...prevState,
        text: "Code",
        value: "",
        placeholder: "Enter your code",
        error: "",
      }));
    }
  }, []);

  const handleChange = (field) => (e) => {};

  return (
    <FormContainer>
      <h2 className="mb-8">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
      </h2>
      {pageFunction === 1 && <ResetPasswordPage />}
      {pageFunction === 2 && <ConfrimEmailPage />}
    </FormContainer>
  );
};
