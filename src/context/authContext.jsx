import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem("ptoken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("ptoken", token);
    setIsAuthenticated(true); // Update isAuthenticated state
  };

  const logout = () => {
    localStorage.removeItem("ptoken");
    localStorage.removeItem("userId");
    setIsAuthenticated(false); // Update isAuthenticated state
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);