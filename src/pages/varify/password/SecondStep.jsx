import { useEffect, useState } from "react";

import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const validateCode = (code) => {
  if (code.trim() === "") {
    return "Code is required";
  }
  if (code.length < 6) {
    return "Code must be +6 digits";
  }
  return "";
};

export const SecondStep = ({ onContinue, setSteps }) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);

  useEffect(() => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    const { code } = ResetPage;
    if (code) {
      setState((prevState) => ({
        ...prevState,
        value: code,
        error: code === "" ? "" : validateCode(code),
      }));

      if (validateCode(code) === "") {
        setEnableContinue(true);
      }
    } else {
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({
          ...ResetPage,
          code: "",
        })
      );
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validateCode(value),
    }));

    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    localStorage.setItem(
      "ResetPage",
      JSON.stringify({
        ...ResetPage,
        code: value,
      })
    );

    if (validateCode(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
    }
  };

  const handleClick = () => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    localStorage.setItem(
      "ResetPage",
      JSON.stringify({
        ...ResetPage,
        step: 1,
        code: "",
      })
    );
    setSteps(1);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-nunito font-bold">Reset your password</h2>
      <div className="w-full">
        <Input
          text="Code"
          type="text"
          placeholder="Enter your code"
          error={state.error}
          change={handleChange}
          value={state.value}
        />
        <button
          className="text-center text-gray-500 font-nunito select-none cursor-pointer"
          onClick={handleClick}
        >
          Try another email address?
        </button>
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
