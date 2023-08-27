import React, { useReducer, useEffect, useContext } from "react";
import { RegisterContext } from "../../contexts/register";
import { Input } from "../../components/Input";
import { RegisterBtn } from "./RegisterBtn";

const INITIALSTATE = {
  phone: "",
  password: "",
  confirmPassword: "",
  continue: false,
  errors: {
    phone: "",
    pasword: "",
    confirmPassword: "",
  },
};

const enableContinue = (state) => {
  const { phone, password, confirmPassword } = state;

  return (
    validatePhone(phone) &&
    password.trim() !== "" &&
    validatePassword(password) &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword
  );
};

const validatePhone = (phone) => {
  const len = phone.length;
  const isNum = !isNaN(phone);

  if (len === 11 && isNum && phone[0] === "0") {
    return true;
  } else if (len === 12 && isNum && phone[0] === "2") {
    return true;
  }
  return false;
};

const validatePassword = (password) => {
  return password.length >= 8 && /\d/.test(password);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PHONE":
      const { field, value } = action.payload;
      const fieldErrors = { ...state.errors };
      fieldErrors[field] =
        value.trim() === ""
          ? `phone is required`
          : validatePhone(value)
          ? ""
          : "Invalid Phone Number";
      return {
        ...state,
        [field]: value,
        errors: fieldErrors,
        continue: enableContinue({ ...state, [field]: value }),
      };
    case "SET_PASS":
      const { field: fieldPass, value: valuePass } = action.payload;
      const fieldErrorsPass = { ...state.errors };
      fieldErrorsPass[fieldPass] =
        valuePass.trim() === ""
          ? `password is required`
          : validatePassword(valuePass)
          ? ""
          : "Password must be at least 8 characters and contain at least 1 number";
      return {
        ...state,
        [fieldPass]: valuePass,
        errors: fieldErrorsPass,
        continue: enableContinue({ ...state, [fieldPass]: valuePass }),
      };
    case "SET_CONFIRM":
      const { field: fieldConfirm, value: valueConfirm } = action.payload;
      const fieldErrorsConfirm = { ...state.errors };
      fieldErrorsConfirm[fieldConfirm] =
        valueConfirm.trim() === ""
          ? `password is required`
          : valueConfirm === state.password
          ? ""
          : "Password does not match";
      return {
        ...state,
        [fieldConfirm]: valueConfirm,
        errors: fieldErrorsConfirm,
        continue: enableContinue({ ...state, [fieldConfirm]: valueConfirm }),
      };
    default:
      return state;
  }
};

export const ThirdStep = ({ person }) => {
  const [state, dispatch] = useReducer(reducer, INITIALSTATE);
  const { register, setRegister } = useContext(RegisterContext);

  useEffect(() => {
    const RegisterData = JSON.parse(localStorage.getItem("userRegisterData"));
    const { phone, password, confirmPassword } = RegisterData;
    if (phone) {
      dispatch({
        type: "SET_PHONE",
        payload: { field: "phone", value: phone },
      });
    }

    if (password) {
      dispatch({
        type: "SET_PASS",
        payload: { field: "password", value: password },
      });
    }

    if (confirmPassword) {
      dispatch({
        type: "SET_CONFIRM",
        payload: {
          field: "confirmPassword",
          value: confirmPassword,
        },
      });
    }
  }, []);

  const handleUserData = (field, value) => {
    setRegister((prev) => ({ ...prev, [field]: value }));
    localStorage.setItem(
      "userRegisterData",
      JSON.stringify({ ...register, [field]: value })
    );
  };

  const handlePhoneChange = (field) => (e) => {
    dispatch({ type: "SET_PHONE", payload: { field, value: e.target.value } });
    handleUserData(field, e.target.value);
  };

  const handlePasswordChange = (field) => (e) => {
    dispatch({ type: "SET_PASS", payload: { field, value: e.target.value } });
    handleUserData(field, e.target.value);
  };

  const handleConfirmPassChange = (field) => (e) => {
    dispatch({
      type: "SET_CONFIRM",
      payload: { field, value: e.target.value },
    });
    handleUserData(field, e.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-nunito font-bold text-center">
        One last step
      </h2>
      <div className="w-full">
        <Input
          text={
            register.user_type === 1 ? "Phone Number" : "Parent's Phone Number"
          }
          type="text"
          placeholder="Enter your phone number"
          error={state.errors.phone}
          change={handlePhoneChange("phone")}
          value={state.phone}
        />
        <Input
          text="Password"
          type="password"
          placeholder="Enter Password"
          error={state.errors.password}
          change={handlePasswordChange("password")}
          value={state.password}
        />
        <Input
          text="Confirm Password"
          type="password"
          placeholder="Confirm your Password"
          error={state.errors.confirmPassword}
          change={handleConfirmPassChange("confirmPassword")}
          value={state.confirmPassword}
        />
      </div>
      <RegisterBtn enabled={state.continue} />
    </div>
  );
};
