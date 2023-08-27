import { useEffect, useState, useContext } from "react";
import { PasswordContext } from "../../../contexts/resetPassword";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

export const ResetPasswordPage = () => {
  const [steps, setSteps] = useState(1);
  const { password, setPassword } = useContext(PasswordContext);

  useEffect(() => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    if (ResetPage) {
      setSteps(ResetPage.step);
    } else {
      localStorage.setItem("ResetPage", JSON.stringify({ step: 1 }));
    }
  }, []);

  const handleContinue = () => {
    if (password.step < 3) {
      setSteps(steps + 1);
      setPassword((prev) => ({ ...prev, step: prev.step + 1 }));
      const storage = localStorage.getItem("ResetPage");
      localStorage.setItem(
        "ResetPage",
        JSON.stringify({ ...JSON.parse(storage), step: steps + 1 })
      );
    }
  };

  return (
    <>
      {password.step === 1 && <FirstStep onContinue={handleContinue} />}
      {password.step === 2 && (
        <SecondStep onContinue={handleContinue} setSteps={setSteps} />
      )}
      {password.step === 3 && <ThirdStep onContinue={handleContinue} />}
    </>
  );
};
