import React from "react";
import { useState, useEffect, createContext } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const [isLogged, setIsLogged] = useState(false);

  function fillUserData({ token }) {
    localStorage.setItem("@authDentista", JSON.stringify({ token }));

    setUserData({ ...userData, token });
    setIsLogged(true);
  }

  function removeUserData() {
    localStorage.removeItem("@authDentista");
    localStorage.removeItem("favorites");
    localStorage.removeItem("@theme");
    setIsLogged(false);
  }

  useEffect(() => {
    const res = localStorage.getItem("@authDentista");

    let user;

    if (res) {
      user = JSON.parse(res);

      fillUserData({ token: user.token });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ userData, fillUserData, isLogged, removeUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;