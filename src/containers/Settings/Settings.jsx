import React from "react";
import { Outlet } from "react-router-dom";
import './Settings.scss'
const Settings = () => {
 
  return (
    <div className="settings-section">
       <Outlet/>
    </div>
  );
};

export default Settings; 