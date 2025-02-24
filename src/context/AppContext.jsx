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
        console.log(userData)
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      // toast.error(data.message);
    }
  };
  const getAllAppointments = async () => {
    try {
      const {data} =await axios.get(`${backendUrl}/api/patient/all-appointment/${userId}`)
       if(data.success){
        setAppointments(data.data);
       }else{
        toast.error("Error in Fetching Appointments")
       }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getUserProfile = async () => {
    // try {
    //   const userData = {
    //     message: "User profile retrieved successfully",
    //     data: {
    //       address: {
    //         line1: "789 New Avenue",
    //         line2: "Suite 101",
    //       },
    //       _id: "678fb723c6a466e20ff95dc3",
    //       name: "Admin Admin",
    //       email: "admin@admin.com",
    //       role: "ADMIN",
    //       phone: "9876543",
    //       appointments: [
    //         "6793c1f0ba4d39493c01bf0f",
    //         "6793c633ba4d39493c01bf16",
    //         "6793c70199223ce16f50a9b5",
    //         "6793c72770594e1f059f5359",
    //         "67947512eb79eb48547620e3",
    //       ],
    //       uploadedFiles: [],
    //       createdAt: "2025-01-21T15:02:59.596Z",
    //       updatedAt: "2025-01-25T18:35:20.531Z",
    //       __v: 6,
    //       gender: "Male",
    //       dob: "Sat Jan 01 2022 00:00:00 GMT+0530 (India Standard Time)",
    //     },
    //   };
    //   setUserData(userData.data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const getAllDoctor = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/`);
    } catch (error) {}
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
