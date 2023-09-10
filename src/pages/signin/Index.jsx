// hooks
import { useReducer, useEffect } from "react";

// components
import { Link } from "react-router-dom";
import { FormContainer } from "../../components/FormContainer";
import { Input } from "../../components/Input";
import { SigninBtn } from "./SigninBtn";

// assets
import logo from "../../assets/logos/Logo.png";

const INITIALSTATE = {
  email: "",
  password: "",
  continue: false,
  errors: {
    email: "",
    password: "",
  },
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const enableContinue = (state) => {
  const { email, password } = state;
  const { errors } = state;

  return (
    email.trim() !== "" &&
    validateEmail(email) &&
    password !== "" &&
    password.length >= 8 &&
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

export const SigninPage = () => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);

  useEffect(() => {
    localStorage.removeItem("userRegisterData");
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));

    if (userLogin) {
      if (userLogin.email === "" && userLogin.password === "") {
        return;
      }

      dispatch({
        type: "SET_FIELD",
        payload: { field: "email", value: userLogin.email },
      });
      dispatch({
        type: "SET_FIELD",
        payload: { field: "password", value: userLogin.password },
      });
    }
  }, []);

  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", payload: { field, value: e.target.value } });
    localStorage.setItem(
      "userLogin",
      JSON.stringify({ ...state, [field]: e.target.value })
    );
  };

  return (
    <FormContainer>
      <h2 className="mb-8">
        <Link to="/">
          <img src={logo} alt="logo" className="h-10" />
        </Link>
      </h2>
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-nunito font-bold">Welcome Back!</h2>
        <div className="w-full">
          <Input
            text="Email"
            type="text"
            placeholder="Enter your email"
            error={state.errors.email}
            change={handleChange("email")}
            value={state.email}
          />
          <Input
            text="Password"
            type="password"
            placeholder="Enter Password"
            error={state.errors.password}
            change={handleChange("password")}
            value={state.password}
          />
          <div>
            <Link to="/forgot-password" className="text-primary font-nunito">
              Forgot Password ?
            </Link>
          </div>
        </div>
        <SigninBtn
          enabled={state.continue}
          data={{
            email: state.email,
            password: state.password,
          }}
        />
        <div>
          <p className="text-center text-gray-500 font-nunito select-none">
            Doesn't have an Account ?{" "}
            <Link to="/register" className="text-primary font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};
