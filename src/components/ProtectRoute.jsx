import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Import useAuth

export default function ProtectRoute({ redirectPath = "/login" }) {
  const { isAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // Render the nested routes using Outlet
  return <Outlet />;
}