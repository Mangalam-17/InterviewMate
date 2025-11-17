import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";


const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) return null;

  const fallbackLetter = user.name ? user.name[0].toUpperCase() : "U";

  return (
    <div className="flex items-center gap-3">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt="Profile"
          className="w-11 h-11 rounded-full object-cover ring-2 ring-red-200 shadow-sm"
        />
      ) : (
        <div className="w-11 h-11 rounded-full bg-red-50 ring-2 ring-red-200 text-red-600 font-semibold flex items-center justify-center shadow-sm">
          {fallbackLetter}
        </div>
      )}

      <div className="flex flex-col text-right">
        <span className="text-sm font-semibold text-gray-900 leading-tight">
          {user.name}
        </span>

        <button
          className="text-sm text-red-500 font-medium hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
