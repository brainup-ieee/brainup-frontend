import { useEffect, useState } from "react";

import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

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

  useEffect(() => {
    const ResetPage = localStorage.getItem("ResetPage");
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
