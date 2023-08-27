import { useEffect, useState } from "react";

import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const validatePassword = (password) => {
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

export const ThirdStep = ({ onContinue }) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);

  useEffect(() => {
    const ResetPage = localStorage.getItem("ResetPage");
    const { password } = JSON.parse(ResetPage);
    if (ResetPage) {
      const { email } = JSON.parse(ResetPage);
      setState((prevState) => ({
        ...prevState,
        value: email,
        error: email === "" ? "" : validateEmail(email),
      }));

      if (validateEmail(email) === "") {
        setEnableContinue(true);
      }
    } else {
      localStorage.setItem("ResetPage", JSON.stringify({ step: 1, email: "" }));
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validateEmail(value),
    }));

    localStorage.setItem(
      "ResetPage",
      JSON.stringify({ step: 1, email: value })
    );

    if (value.trim() !== "" && validateEmail(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
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
          clickHandler={onContinue}
        />
      </div>
    </div>
  );
};
