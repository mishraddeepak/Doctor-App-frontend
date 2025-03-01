import React, { createContext, useState, useEffect, useContext } from "react";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Use `null` to indicate loading state
  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("ptoken");
    setIsAuthenticated(!!token); // `!!token` converts to `true` if token exists, otherwise `false`
  }, []);
  const login = (token) => {
    localStorage.setItem("ptoken", token);
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("ptoken");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
