import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { PasswordContext } from "../../../contexts/resetPassword";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";

const useResetPassword = (password, token) => {
  return useMutation(["forgot-password", 3], () =>
    axios.post("https://brainup-api.mazenamir.com/api/auth/reset-password", {
      password,
      token,
    })
  );
};

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
  const navigate = useNavigate();
  const [state, setState] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [enableContinue, setEnableContinue] = useState(false);
  const userToken = localStorage.getItem("userToken");
  const { password, setPassword } = useContext(PasswordContext);
  const resetPasswordMutation = useResetPassword(password.password, userToken);

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

    setPassword((prev) => ({ ...prev, password: value }));

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

  const handleNewPassword = async () => {
    const { data } = await resetPasswordMutation.mutateAsync();
    if (data.status === "failed") {
      alert(data.message);
    } else if (data.status === "success") {
      console.log(data);
      navigate("/login");
    }
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
          text="Save Password"
          enabled={enableContinue}
          clickHandler={handleNewPassword}
          isLoading={resetPasswordMutation.isLoading}
        />
      </div>
    </div>
  );
};
