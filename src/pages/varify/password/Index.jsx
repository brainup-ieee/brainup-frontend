import { useEffect, useState, useContext } from "react";
import { PasswordContext } from "../../../contexts/resetPassword";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";
import { AuthAlertContextProvider } from "../../../contexts/authAlert";
import { ErrorAlert } from "../../../components/ErrorAlert";

export const ResetPasswordPage = () => {
  const { password, setPassword } = useContext(PasswordContext);

  useEffect(() => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    if (ResetPage) {
      setPassword((prev) => ({ ...prev, step: ResetPage.step }));
    } else {
      localStorage.setItem("ResetPage", JSON.stringify(password));
    }
  }, []);

  const handleContinue = () => {
    if (password.step < 3) {
      setPassword((prev) => ({ ...prev, step: prev.step + 1 }));
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({ ...password, step: password.step + 1 })
      );
    }
  };

  return (
    <AuthAlertContextProvider>
      <ErrorAlert />
      {password.step === 1 && <FirstStep onContinue={handleContinue} />}
      {password.step === 2 && <SecondStep onContinue={handleContinue} />}
      {password.step === 3 && <ThirdStep onContinue={handleContinue} />}
    </AuthAlertContextProvider>
  );
};
