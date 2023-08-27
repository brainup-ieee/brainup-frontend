// hooks
import { useState, useEffect, useContext } from "react";

// contexts
import { RegisterContext } from "../../contexts/register";

// components
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { RegisterToggle } from "./FirstStep";
import { SecondStep } from "./SecondStep";
import { ThirdStep } from "./ThirdStep";

// assets
import logo from "../../assets/logos/Logo.png";

export const RegisterPage = () => {
  const { register, setRegister } = useContext(RegisterContext);
  const [userProgress, setUserProgress] = useState({
    personToggle: 0,
    step: 1,
  });

  useEffect(() => {
    const userRegisterData = localStorage.getItem("userRegisterData");

    if (userRegisterData) {
      setRegister(JSON.parse(userRegisterData));
    } else {
      localStorage.setItem("userRegisterData", JSON.stringify({ ...register }));
    }
  }, [setUserProgress]);

  const handleNextStep = () => {
    if (userProgress.step < 3) {
      setRegister((prev) => ({ ...prev, step: prev.step + 1 }));
      localStorage.setItem(
        "userRegisterData",
        JSON.stringify({ ...register, step: register.step + 1 })
      );
    }
  };

  const handlePrevStep = () => {
    if (userProgress.step >= 1) {
      setRegister((prev) => ({ ...prev, step: prev.step - 1 }));
      localStorage.setItem(
        "userRegisterData",
        JSON.stringify({ ...register, step: register.step - 1 })
      );
    }
  };

  const teacherRegister = () => {
    if (userProgress.personToggle !== 1) {
      setRegister((prev) => ({ ...prev, user_type: 1 }));
      localStorage.setItem(
        "userRegisterData",
        JSON.stringify({ ...register, user_type: 1 })
      );
    }
  };

  const studentRegister = () => {
    if (userProgress.personToggle !== 2) {
      setRegister((prev) => ({ ...prev, user_type: 2 }));
      localStorage.setItem(
        "userRegisterData",
        JSON.stringify({ ...register, user_type: 2 })
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
      {register.step === 1 && (
        <RegisterToggle
          personToggle={register.user_type}
          teacherRegister={teacherRegister}
          studentRegister={studentRegister}
          onContinue={handleNextStep}
        />
      )}
      {register.step === 2 && (
        <SecondStep
          person={register.user_type}
          onContinue={handleNextStep}
          data={userProgress}
          setData={setUserProgress}
          onPrev={handlePrevStep}
        />
      )}

      {register.step === 3 && <ThirdStep person={register.user_type} />}
    </FormContainer>
  );
};
