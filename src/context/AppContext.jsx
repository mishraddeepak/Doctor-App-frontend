import React, { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export const AppContext = createContext();
export default function AppContextProvider(props) {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const adminUrl = import.meta.env.VITE_ADMIN_PANEL_URL;

  console.log("admin url", adminUrl);
  console.log("backendUrl is.....", backendUrl);
  const [ptoken, setPToken] = useState(
    localStorage.getItem("ptoken") ? localStorage.getItem("ptoken") : false
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("userId") ? localStorage.getItem("userId") : ""
  );
  const [userData, setUserData] = useState({});
  const [appointments, setAppointments] = useState([]);
  console.log(userId);
  console.log(userData);
  useEffect(() => {
    if (ptoken) {
      console.log("hii");
      fetchUser();
    }
  }, [ptoken]);
  const fetchUser = async () => {
    console.log(ptoken);
    try {
      console.log(ptoken);
      const { data } = await axios.get(`${backendUrl}/api/user`, {
        headers: {
          Authorization: `Bearer ${ptoken}`,
        },
      });
      console.log(data);
      if (data) {
        setUserData(data.user);
        setUserId(data.user._id);
        console.log(userData);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(data?.message);
    }
  };
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/patient/all-appointment/${userId}`
      );
      if (data.success) {
        setAppointments(data.data);
      } else {
        toast.error("Error in Fetching Appointments");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(userData);
  const value = {
    ptoken,
    setPToken,
    backendUrl,
    userId,

    setUserData,
    appointments,
    getAllAppointments,
    userData,
    fetchUser,
    // new

    // old
    doctors,
    currencySymbol,
    adminUrl,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}
