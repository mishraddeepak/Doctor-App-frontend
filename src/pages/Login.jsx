import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext"; // Import useAuth

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const { ptoken, setPToken, backendUrl, setUserData, fetchUser, userObj } =
    useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const loginUser = async (userData) => {
    try {
      console.log(backendUrl)
      const { data } = await axios.post(`${backendUrl}/api/login`, userData);
      console.log(data);
      if (data.success) {
        toast.success(data.message);
        setPToken(data.accessToken);
        setUserData(data.user);
        localStorage.setItem("ptoken", data.accessToken);
        localStorage.setItem("userId", data.user._id);
        login(data.accessToken); // Call login function from AuthContext
        navigate("/");
        fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const registerUser = async (userData) => {
    try {
      console.log(backendUrl)
      const { data } = await axios.post(
        `${backendUrl}/api/createuser`,
        userData
      );
      if (data.success) {
        toast.success("You have registered");
        localStorage.setItem("ptoken", data.token);
        setPToken(data.token);
        setUserData(data.userObj);
        localStorage.setItem("userId", data.userObj._id);
        login(data.token); // Call login function from AuthContext
        navigate("/");
        fetchUser();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(data.message);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Sign Up") {
        const userData = {
          name,
          email,
          password,
          phone,
          role: "PATIENT",
        };
        await registerUser(userData);
      } else {
        const userData = {
          email,
          password,
        };

        await loginUser(userData);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {}, [ptoken]);

  return (
    <form onSubmit={submitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>
        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {state === "Sign Up" ? (
          <div className="w-full">
            <p>Contact No.</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              pattern="[0-9]{10}"
            />
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Log In"}
        </button>
        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Log In")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}