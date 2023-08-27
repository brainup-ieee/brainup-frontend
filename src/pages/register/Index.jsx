// hooks
import { useState, useEffect } from "react";

// components
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { RegisterToggle } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

// assets
import logo from "../../assets/logos/Logo.png";

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
    }
  };

  const handlePrevStep = () => {
    console.log("onPrev");
    if (userProgress.step >= 1) {
      setUserProgress((prev) => ({ ...prev, step: prev.step - 1 }));
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, step: userProgress.step - 1 })
      );
      console.log("onPrev");
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

  return (
    <FormContainer>
      <h2 className="mb-8">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
      </h2>
      {userProgress.step === 1 && (
        <RegisterToggle
          personToggle={userProgress.personToggle}
          teacherRegister={teacherRegister}
          studentRegister={studentRegister}
          onContinue={handleNextStep}
        />
      )}
      {userProgress.step === 2 && (
        <SecondStep
          person={userProgress.personToggle}
          onContinue={handleNextStep}
          data={userProgress}
          setData={setUserProgress}
          onPrev={handlePrevStep}
        />
      )}

      {userProgress.step === 3 && (
        <ThirdStep person={userProgress.personToggle} />
      )}
    </FormContainer>
  );
};
