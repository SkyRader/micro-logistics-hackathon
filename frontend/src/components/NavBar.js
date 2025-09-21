import React from "react";
import './NavBarcss.css';
import noprofile from "./noprofile.png";

function NavBar() {
  return (
    <div className="topnav">
      <div className="nav-left">
        <span className="logo">Logo</span>
      </div>

      <div className="nav-right">
        <span className="user-info">User ID</span>
        <span className="user-info">Role</span>
        <span className="user-info">Name</span>
        <img src={noprofile} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
}

export default NavBar;
