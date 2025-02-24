import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../src/components/ProtectRoute";
import { AuthProvider } from "../src/context/authContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-appointments" element={<MyAppointments />} />
            <Route path="/my-appointments:docId" element={<MyAppointments />} />
            <Route path="/book-appointment" element={<Appointment />} />
          </Route>
        </Routes>

        <ToastContainer position="top-center" autoClose={1200} />
      </div>
    </AuthProvider>
  );
}

export default App;