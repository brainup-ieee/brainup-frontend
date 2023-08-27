import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { PasswordContext } from "../../../contexts/resetPassword";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const useConfirmEmail = (email) => {
  return useMutation(["forgot-password", 1], () =>
    axios.post("https://brainup-api.mazenamir.com/api/auth/forgot-password", {
      email,
    })
  );
};

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
  const confirmEmailMutation = useConfirmEmail(password.email);

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
    // const { data } = await confirmEmailMutation.mutateAsync();
    // if (data.status === "failed") {
    //   alert(data.message);
    // } else if (data.status === "success") {
    //   console.log(data);
    //   onContinue();
    // }
    onContinue();
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
