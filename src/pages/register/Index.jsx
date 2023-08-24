// hooks
import { useState, useEffect } from "react";

// components
import { Link } from "react-router-dom";
import { RegisterToggle } from "./FirstStep";
import { Teacher } from "./Teacher";
import { Input } from "../../components/Input";
import { ButtonFull } from "../../components/ButtonFull";
import { SecondStep } from "./SecondStep";

export const RegisterPage = () => {
  const [userProgress, setUserProgress] = useState({
    personToggle: 0,
    step: 1,
    data: {},
  });

  useEffect(() => {
    const progress = localStorage.getItem("userProgress");
    if (progress) {
      setUserProgress(JSON.parse(progress));
    }
    console.log(userProgress);
  }, []);

  const handleNextStep = () => {
    if (userProgress.step < 3) {
      setUserProgress({ ...userProgress, step: userProgress.step + 1 });
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, step: userProgress.step + 1 })
      );
    }
  };

  const teacherRegister = () => {
    if (userProgress.personToggle !== 1) {
      setUserProgress({ ...userProgress, personToggle: 1 });
      localStorage.setItem(
        "userProgress",
        JSON.stringify({ ...userProgress, personToggle: 1 })
      );
    }
  };

  const studentRegister = () => {
    if (userProgress.personToggle !== 2) {
      setUserProgress({ ...userProgress, personToggle: 2 });
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
    <main className="w-full min-h-screen bg-secondary flex justify-center items-center">
      <div className="m-4 p-8 bg-white rounded-xl max-w-sm">
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

        {userProgress.step === 3 && <Teacher />}
      </div>
    </main>
  );
};
