import { useEffect, useState, useContext } from "react";
import { PasswordContext } from "../../../contexts/resetPassword";
import { AuthAlertContext } from "../../../contexts/authAlert";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";
import { usePostVarify } from "../../../hooks/useFetch";

const validateEmail = (email) => {
  if (email.trim() === "") {
    return "Email is required";
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
  return "";
};

export const FirstStep = ({ onContinue }) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);
  const { password, setPassword } = useContext(PasswordContext);
  const { setAuthAlert } = useContext(AuthAlertContext);
  const url = "https://brainup-api.mazenamir.com/api/auth/forgot-password";
  const body = { email: password.email };
  const confirmEmailMutation = usePostVarify(url, body);

  useEffect(() => {
    const ResetPage = localStorage.getItem("ResetPage");
    if (ResetPage) {
      const { email } = JSON.parse(ResetPage);
      setPassword((prev) => ({ ...prev, email }));
      setState((prevState) => ({
        ...prevState,
        value: email,
        error: email === "" ? "" : validateEmail(email),
      }));

      if (validateEmail(email) === "") {
        setEnableContinue(true);
      }
    } else {
      localStorage.setItem("ResetPage", JSON.stringify(password));
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validateEmail(value),
    }));

    setPassword((prev) => ({ ...prev, email: value }));

    localStorage.setItem(
      "ResetPage",
      JSON.stringify({ ...password, email: value })
    );

    if (value.trim() !== "" && validateEmail(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
    }
  };

  const handleContinue = async () => {
    const data = await confirmEmailMutation.mutateAsync(url, body);
    if (data === undefined) {
      setAuthAlert({
        show: true,
        message: "Something went wrong, please try again later",
      });
      return;
    }

    if (data.status === "success") {
      onContinue();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-nunito font-bold">Reset your password</h2>
      <div className="w-full">
        <Input
          text="Email"
          type="text"
          placeholder="Enter your email"
          error={state.error}
          change={handleChange}
          value={state.value}
        />
      </div>
      <div>
        <ButtonFull
          text="Continue"
          enabled={enableContinue}
          clickHandler={handleContinue}
          isLoading={confirmEmailMutation.isLoading}
        />
      </div>
    </div>
  );
};
