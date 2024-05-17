import React, { createContext, useContext, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { CHECK_AUTH }  

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [checkAuth] = useLazyQuery(CHECK_AUTH, {
    onCompleted: (data) => {
      setIsAuthenticated(data.isAuthenticated);
    },
    onError: () => {
      setIsAuthenticated(false);
    },
  });

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
