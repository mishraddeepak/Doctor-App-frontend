// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/authContext"; // Import useAuth

// export default function ProtectRoute({ redirectPath = "/" }) {
//   const { isAuthenticated } = useAuth(); // Get isAuthenticated from AuthContext

//   if (!isAuthenticated) {
//     return <Navigate to={redirectPath} replace />;
//   }

//   // Render the nested routes using Outlet
//   return <Outlet />;
// }



import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectRoute({ redirectPath = "/" }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Show a loading state while checking authentication
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />;
}
