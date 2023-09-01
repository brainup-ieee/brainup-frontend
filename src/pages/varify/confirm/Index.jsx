import { useEffect, useState } from "react";
import { useMutation } from "react-query";
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

export const ConfrimEmailPage = () => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);

  useEffect(() => {}, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validateCode(value),
    }));

    if (validateCode(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
    }
  };

  const handleClick = () => {};

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-nunito font-bold">Confirm Your Email</h2>
      <div className="w-full">
        <Input
          text="Code"
          type="text"
          placeholder="Enter the code sent to your Email"
          error={state.error}
          change={handleChange}
          value={state.value}
        />
      </div>
      <div className="mt-12">
        <ButtonFull
          text="Confirm"
          enabled={enableContinue}
          //   clickHandler={onContinue}
        />
      </div>
    </div>
  );
};
