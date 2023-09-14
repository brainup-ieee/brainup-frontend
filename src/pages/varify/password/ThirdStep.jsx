import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { PasswordContext } from "../../../contexts/resetPassword";
import { AuthAlertContext } from "../../../contexts/authAlert";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";
import { usePostVarify } from "../../../hooks/useFetch";

const useResetPassword = (password, token) => {
  return useMutation(["forgot-password", 3], () =>
    axios.post("https://brainup-api.mazenamir.com/api/auth/reset-password", {
      password,
      token,
    })
  );
};

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
  const { password, setPassword } = useContext(PasswordContext);
  const { setAuthAlert } = useContext(AuthAlertContext);
  const url = "https://brainup-api.mazenamir.com/api/auth/reset-password";
  const body = {
    password: password.password,
    token: password.token,
  };
  const resetPasswordMutation = usePostVarify(url, body);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (!userToken) {
      alert("Something went wrong");
      navigate("/signin");
    }

    const resetPage = localStorage.getItem("ResetPage");
    if (resetPage) {
      const data = JSON.parse(resetPage);
      setPassword({ ...data, step: 3, token: userToken });
    } else {
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({ ...password, step: 1 })
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

    localStorage.setItem(
      "ResetPage",
      JSON.stringify({
        ...password,
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
    const data = await resetPasswordMutation.mutateAsync(url, body);

    if (data === undefined) {
      setAuthAlert({
        show: true,
        message: "Something went wrong, please try again again",
      });
      return;
    }

    if (data.status === "failed") {
      setAuthAlert({
        show: true,
        message: data.message,
      });
    } else if (data.status === "success") {
      localStorage.removeItem("ResetPage");
      localStorage.removeItem("userToken");
      navigate("/password-success");
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
          enabled={enableContinue && !resetPasswordMutation.isLoading}
          clickHandler={handleNewPassword}
          isLoading={resetPasswordMutation.isLoading}
        />
      </div>
    </div>
  );
};
