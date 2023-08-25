// hooks
import { useState, useEffect } from "react";

// components
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { RegisterToggle } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

export const RegisterPage = () => {
  const [userProgress, setUserProgress] = useState({
    personToggle: 0,
    step: 1,
  });

  useEffect(() => {
    const progress = localStorage.getItem("userProgress");
    if (progress) {
      setUserProgress(JSON.parse(progress));
    }
  }, [setUserProgress]);

  const handleNextStep = () => {
    if (userProgress.step < 3) {
      setUserProgress((prev) => ({ ...prev, step: prev.step + 1 }));
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, step: userProgress.step + 1 })
      );
      console.log("Next step");
    }
  };

  const teacherRegister = () => {
    if (userProgress.personToggle !== 1) {
      setUserProgress((prev) => ({ ...prev, personToggle: 1 }));
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, personToggle: 1 })
      );
    }
  };

  const studentRegister = () => {
    if (userProgress.personToggle !== 2) {
      setUserProgress((prev) => ({ ...prev, personToggle: 2 }));
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, personToggle: 2 })
      );
    }
  };

  const onContinue = () => {
    handleNextStep();
  };

  return (
    <FormContainer>
      <h2 className="mb-8">
        <Link
          to="/"
          className="text-primary font-nunito font-extrabold text-xl"
        >
          BrainUp
        </Link>
      </h2>
      {userProgress.step === 1 && (
        <RegisterToggle
          personToggle={userProgress.personToggle}
          teacherRegister={teacherRegister}
          studentRegister={studentRegister}
          onContinue={onContinue}
        />
      )}
      {userProgress.step === 2 && (
        <SecondStep
          onContinue={onContinue}
          data={userProgress}
          setData={setUserProgress}
        />
      )}

      {userProgress.step === 3 && (
        <ThirdStep person={userProgress.personToggle} />
      )}
    </FormContainer>
  );
};
