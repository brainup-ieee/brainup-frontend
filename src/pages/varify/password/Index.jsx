import { useEffect, useState } from "react";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

export const ResetPasswordPage = () => {
  const [steps, setSteps] = useState(1);

  useEffect(() => {
    const ResetPage = JSON.parse(localStorage.getItem("ResetPage"));
    if (ResetPage) {
      setSteps(ResetPage.step);
    } else {
      localStorage.setItem("ResetPage", JSON.stringify({ step: 1 }));
    }
  }, []);

  const handleContinue = () => {
    setSteps(steps + 1);
    const storage = localStorage.getItem("ResetPage");
    localStorage.setItem(
      "ResetPage",
      JSON.stringify({ ...JSON.parse(storage), step: steps + 1 })
    );
  };

  return (
    <>
      { steps === 1 && <FirstStep onContinue={handleContinue} />} 
      { steps === 2 && <SecondStep onContinue={handleContinue} setSteps={setSteps}/> }
      { steps === 3 && <ThirdStep onContinue={handleContinue} /> }
    </>
  );
};
