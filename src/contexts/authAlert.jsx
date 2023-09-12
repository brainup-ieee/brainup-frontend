import { createContext, useEffect, useState } from "react";

export const AuthAlertContext = createContext();

export const AuthAlertContextProvider = ({ children }) => {
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
    <AuthAlertContext.Provider
      value={{
        authAlert,
        setAuthAlert,
      }}
    >
      {children}
    </AuthAlertContext.Provider>
  );
};
