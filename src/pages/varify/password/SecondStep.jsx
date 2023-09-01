import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { PasswordContext } from "../../../contexts/resetPassword";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const useCodeConfirm = (code) => {
  return useMutation(["forgot-password", 2], () =>
    axios.post(
      "https://brainup-api.mazenamir.com/api/auth/reset-password/verify-code",
      {
        code,
      }
    )
  );
};

const validateCode = (code) => {
  if (code.trim() === "") {
    return "Code is required";
  }
  if (code.length < 6) {
    return "Code must be +6 digits";
  }
  return "";
};

export const SecondStep = ({ onContinue }) => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);
  const { password, setPassword } = useContext(PasswordContext);
  const confirmCodeMutation = useCodeConfirm(password.code);

  useEffect(() => {
    const ResetPage = localStorage.getItem("ResetPage");
    if (ResetPage) {
      const data = JSON.parse(ResetPage);
      setPassword({ ...data, step: 2 });
    } else {
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({ ...password, step: 1 })
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

    setPassword((prev) => ({ ...prev, code: value }));

    localStorage.setItem(
      "ResetPage",
      JSON.stringify({ ...password, code: value })
    );

    if (validateCode(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
    }
  };

  const handleContinue = async () => {
    const { data } = await confirmCodeMutation.mutateAsync();
    if (data.status === "failed") {
      alert(data.message);
    } else if (data.status === "success") {
      alert(data.token);
      setPassword((prev) => ({ ...prev, token: data.token }));
      localStorage.setItem("userToken", data.token);
      onContinue();
    }
  };

  const handleClick = () => {
    setPassword((prev) => ({ ...prev, step: 1, code: "" }));
    localStorage.setItem(
      "ResetPage",
      JSON.stringify({ ...password, step: 1, code: "" })
    );
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
          clickHandler={handleContinue}
          isLoading={confirmCodeMutation.isLoading}
        />
      </div>
    </div>
  );
};
