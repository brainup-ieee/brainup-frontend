import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { DoneIcon } from "../../components/icons/DoneIcon";
import { ConfirmIcon } from "../../components/icons/ConfirmIcon";
import logo from "../../assets/logos/Logo.png";
import { FormContainer } from "../../components/FormContainer";
import { ButtonFull } from "../../components/ButtonFull";

const PASSWORD = {
  header: "Yor password has been reset",
  icon: <DoneIcon className="w-24 h-24" />,
  message: "Your Password has been reset successfly. you can sign in now.",
};

const CONFIRM = {
  header: "Congratulations !",
  icon: <ConfirmIcon className="w-24 h-24" />,
  message: "Your email confimred successfly. you can sign in now.",
};

export const ProcessSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.slice(1);
  const [state, setState] = useState(null);

  useEffect(() => {
    if (pathname === "password-success") {
      setState(PASSWORD);
    } else if (pathname === "email-success") {
      setState(CONFIRM);
    }
  }, []);

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <FormContainer>
      <h2 className="mb-8">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
      </h2>
      {state && (
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="text-2xl font-nunito font-bold text-center">
            {state.header}
          </h2>
          <div className="w-full flex justify-center">{state.icon}</div>
          <p className="text-center max-w-xs">{state.message}</p>
        </div>
      )}
      <ButtonFull
        text="Sign in"
        enabled={true}
        clickHandler={handleClick}
        isLoading={false}
      />
    </FormContainer>
  );
};
