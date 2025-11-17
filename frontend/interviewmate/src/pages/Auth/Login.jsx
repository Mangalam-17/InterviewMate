import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) return setError("Enter a valid email!");
    if (!password) return setError("Enter your password!");

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div
      className="
      w-[90vw] md:w-[32vw] bg-white rounded-2xl shadow-xl p-8 
      border border-red-200 animate-[fadeIn_0.3s_ease]
    "
    >
      <h3 className="text-2xl font-semibold text-red-600 text-center">
        Welcome Back 👋
      </h3>
      <p className="text-sm text-gray-600 text-center mt-1 mb-6">
        Login to continue your interview journey
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="abc@gmail.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          className="
          mt-2 bg-red-500 text-white rounded-xl py-3 font-semibold 
          hover:bg-red-600 transition shadow-md
        "
        >
          LOGIN
        </button>

        <p className="text-sm text-gray-700 text-center mt-3">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-red-600 font-semibold underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
