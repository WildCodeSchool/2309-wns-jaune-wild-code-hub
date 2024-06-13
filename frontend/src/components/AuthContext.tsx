// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useLazyQuery } from "@apollo/client";
// import { CHECK_AUTH } from "@/requetes/queries/auth.queries";
// import { useRouter } from "next/router";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token);
//   }, []);

//   const [checkAuth] = useLazyQuery(CHECK_AUTH, {
//     onCompleted: (data) => {
//       setIsAuthenticated(data.isAuthenticated);
//     },
//     onError: () => {
//       setIsAuthenticated(false);
//     },
//   });

//   useEffect(() => {
//     checkAuth();
//   }, [checkAuth]);

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setIsAuthenticated(true);
//     router.push("/");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setIsAuthenticated(false);
//     router.push("/auth/login");
//   };
//   return (
//     <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
