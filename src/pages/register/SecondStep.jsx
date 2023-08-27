import { useReducer, useEffect } from "react";

import { Input } from "../../components/Input";
import { ButtonFull } from "../../components/ButtonFull";

const INITIALSTATE = {
  name: "",
  email: "",
  username: "",
  continue: false,
  errors: {
    name: "",
    email: "",
    username: "",
  },
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const enableContinue = (state) => {
  const { name, email, username } = state;
  const { errors } = state;

  return (
    name.trim() !== "" &&
    email.trim() !== "" &&
    validateEmail(email) &&
    username.trim() !== "" &&
    Object.values(errors).every((error) => error === "")
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      const { field, value } = action.payload;
      const fieldErrors = { ...state.errors };
      fieldErrors[field] = value.trim() === "" ? `${field} is required` : "";
      return {
        ...state,
        [field]: value,
        errors: fieldErrors,
        continue: enableContinue({ ...state, [field]: value }),
      };
    default:
      return state;
  }
};

export const SecondStep = ({ person, onContinue, onPrev }) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);

  useEffect(() => {
    const RegisterData = JSON.parse(localStorage.getItem("RegisterData"));
    if (RegisterData) {
      dispatch({
        type: "SET_FIELD",
        payload: { field: "name", value: RegisterData.name },
      });
      dispatch({
        type: "SET_FIELD",
        payload: { field: "email", value: RegisterData.email },
      });
      dispatch({
        type: "SET_FIELD",
        payload: { field: "username", value: RegisterData.username },
      });
    }
  }, []);

  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", payload: { field, value: e.target.value } });
    localStorage.setItem(
      "RegisterData",
      JSON.stringify({ ...state, [field]: e.target.value })
    );
  };

  const handleContinue = () => {
    const RegisterData = JSON.parse(localStorage.getItem("RegisterData"));
    if (RegisterData) {
      localStorage.setItem(
        "RegisterData",
        JSON.stringify({ ...RegisterData, ...state })
      );
    } else {
      localStorage.setItem("RegisterData", JSON.stringify(state));
    }
    onContinue();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-nunito font-bold text-center">
        Great, now let us know more about you.
      </h2>
      <div className="w-full">
        <Input
          text="Name"
          type="text"
          placeholder="Enter your full name"
          error={state.errors.name}
          change={handleChange("name")}
          value={state.name}
        />
        <Input
          text="Email"
          type="text"
          placeholder="Enter your email"
          error={state.errors.email}
          change={handleChange("email")}
          value={state.email}
        />
        <Input
          text="Username"
          type="text"
          placeholder="Enter username"
          error={state.errors.username}
          change={handleChange("username")}
          value={state.username}
        />
      </div>
      <div className="w-full">
        <ButtonFull
          text="Continue"
          enabled={state.continue}
          clickHandler={handleContinue}
        />
      </div>
      <div>
        <button
          className="text-center text-gray-600 font-nunito select-none"
          onClick={onPrev}
        >
          not a {person === 1 ? "teacher" : "student"}?
        </button>
      </div>
    </div>
  );
};
