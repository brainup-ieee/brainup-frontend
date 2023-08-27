import { createContext, useState } from "react";

export const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [register, setRegister] = useState({
    user_type: 0,
    username: "",
    name: "",
    password: "",
    email: "",
    phone_number: null,
    step: 1,
  });

  return (
    <RegisterContext.Provider value={{ register, setRegister }}>
      {children}
    </RegisterContext.Provider>
  );
};
