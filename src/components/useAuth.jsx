import { useState,useEffect } from "react";
export const useAuth=()=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false)
    useEffect(() => {
        const token = localStorage.getItem("ptoken");
        if (token) {
          setIsAuthenticated(true);
        }
      }, []);

      const login = (token) => {
        localStorage.setItem("ptoken", token);
        setIsAuthenticated(true);
      };
      const logout = () => {
        localStorage.removeItem("ptoken");
        setIsAuthenticated(false);
      };
      return { isAuthenticated, login, logout };
}