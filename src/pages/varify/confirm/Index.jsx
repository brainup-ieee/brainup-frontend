import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { ButtonFull } from "../../../components/ButtonFull";
import axios from "axios";

const validateCode = (code) => {
  if (code.trim() === "") {
    return "Code is required";
  }
  if (code.length < 6) {
    return "Code must be +6 digits";
  }
  return "";
};

export const ConfrimEmailPage = () => {
  const [state, setState] = useState({ value: "", error: "" });
  const [enableContinue, setEnableContinue] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {}, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setState((prevState) => ({
      ...prevState,
      value: value,
      error: validateCode(value),
    }));
    if (validateCode(value) === "") {
      setEnableContinue(true);
    } else {
      setEnableContinue(false);
    }
  };

  const handleClick = () => {
    // get code 
    let code = state.value;
    // send code to server
    axios.post("https://brainup-api.mazenamir.com/api/auth/confirm-email/verify-code",{
      code : code
    }).then((res) => {
      // if code is correct
      if (res.data.status === "success") {
        // navigate to dashboard page
        navigate("/"+res.data.user_type+"-dashboard");
      }
    });
    
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-nunito font-bold">Confirm Your Email</h2>
      <div className="w-full">
        <Input
          text="Code"
          type="text"
          placeholder="Enter the code sent to your Email"
          error={state.error}
          change={handleChange}
          value={state.value}
        />
      </div>
      <div className="mt-12">
        <ButtonFull
          text="Confirm"
          enabled={enableContinue}
          clickHandler={handleClick}
        />
      </div>
    </div>
  );
};
