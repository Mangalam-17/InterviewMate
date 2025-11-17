import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* LABEL */}
      <label className="text-[13px] text-gray-800 font-medium">{label}</label>

      {/* INPUT WRAPPER */}
      <div
        className="
          flex items-center gap-3
          w-full px-4 py-3
          rounded-xl bg-white
          border border-red-200
          transition-all duration-200 ease-in-out

          hover:border-red-300
          hover:shadow-sm

          focus-within:border-red-400
          focus-within:ring-4 focus-within:ring-red-100
        "
      >
        {/* INPUT FIELD */}
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e)}
          className="
            w-full bg-transparent outline-none 
            text-[14px] text-gray-900 
            placeholder:text-gray-400
          "
        />

        {/* PASSWORD TOGGLE ICON */}
        {type === "password" &&
          (showPassword ? (
            <FaRegEye
              size={18}
              className="text-red-500 cursor-pointer transition"
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEyeSlash
              size={18}
              className="text-gray-400 cursor-pointer transition"
              onClick={toggleShowPassword}
            />
          ))}
      </div>
    </div>
  );
};

export default Input;
