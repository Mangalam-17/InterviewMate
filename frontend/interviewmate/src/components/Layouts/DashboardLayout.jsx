import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import NavBar from "./NavBar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <NavBar />

      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
