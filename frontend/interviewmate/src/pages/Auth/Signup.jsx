import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = ({ setCurrentPage }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Enter your full name!");
    if (!validateEmail(email)) return setError("Enter a valid email!");
    if (!password) return setError("Enter a password!");

    setError("");

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
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
        Create an Account ✨
      </h3>
      <p className="text-sm text-gray-600 text-center mt-1 mb-6">
        Join Interview Mate AI and grow smarter 🚀
      </p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Your Name"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="example@gmail.com"
          type="email"
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
          mt-2 bg-red-500 text-white rounded-xl py-3 
          font-semibold hover:bg-red-600 transition shadow-md
        "
        >
          SIGN UP
        </button>

        <p className="text-sm text-gray-700 text-center mt-3">
          Already have an account?{" "}
          <button
            type="button"
            className="text-red-600 font-semibold underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
