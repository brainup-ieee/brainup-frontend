import { createContext, useState } from "react";

export const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState({
    email: "",
    code: "",
    password: "",
    step: 1,
  });
  return (
    <PasswordContext.Provider value={{ password, setPassword }}>
      {children}
    </PasswordContext.Provider>
  );
};
