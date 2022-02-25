import React from "react";
import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <div className="section-container">
       <Outlet/>
    </div>
  );
};

export default Settings; 