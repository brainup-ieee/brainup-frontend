import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    isAuth: false,
    user: {
      token: null,
      type: null,
      classrooms: [],
    },
  });

  return (
    <AuthContext.Provider value={{ userState, setUserState }}>
      {children}
    </AuthContext.Provider>
  );
};
