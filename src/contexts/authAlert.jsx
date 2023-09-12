import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authAlert, setAuthAlert] = useState({
    show: false,
    message: "",
  });

  useEffect(() => {
    if (authAlert.show) {
      setTimeout(() => {
        setAuthAlert({
          show: false,
          message: "",
        });
      }, 3000);
    }
  }, [authAlert]);

  return (
    <AuthContext.Provider
      value={{
        authAlert,
        setAuthAlert,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
