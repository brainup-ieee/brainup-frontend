import { useEffect, useState } from "react";

import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const validatePassword = (password) => {
  console.log(password);
  if (password.trim() === "") {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be +8 digits";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  return "";
};

const validateContinue = (password, confirmPassword) => {
  return validatePassword(password) === "" && confirmPassword === password;
};

export const ThirdStep = ({ onContinue }) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [enableContinue, setEnableContinue] = useState(false);

  useEffect(() => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    const { password } = ResetPage;
    if (!password) {
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({
          ...ResetPage,
          password: "",
        })
      );
    }
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validatePassword(value),
    }));

    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    localStorage.setItem(
      "ResetPage",
      JSON.stringify({
        ...ResetPage,
        password: value,
      })
    );
    setEnableContinue(validateContinue(value, confirmPassword.value));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    if (value !== state.value) {
      setConfirmPassword((prevState) => ({
        ...prevState,
        value: value,
        error: "Password does not match",
      }));
    } else {
      setConfirmPassword((prevState) => ({
        ...prevState,
        value: value,
        error: "",
      }));
    }
    setEnableContinue(validateContinue(state.value, value));
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-nunito font-bold">
        Enter your new password
      </h2>
      <div className="w-full">
        <Input
          text="Password"
          type="password"
          placeholder="Enter new Password"
          error={state.error}
          change={handlePasswordChange}
          value={state.value}
        />
        <Input
          text="Confirm Password"
          type="password"
          placeholder="Confirm new Password"
          error={confirmPassword.error}
          change={handleConfirmPasswordChange}
          value={confirmPassword.value}
        />
      </div>
      <div>
        <ButtonFull
          text="Continue"
          enabled={enableContinue}
          clickHandler={onContinue}
        />
      </div>
    </div>
  );
};
