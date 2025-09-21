import React from 'react';
import './NavBar.css'; // Changed from NavBarcss.css to NavBar.css for consistency

// We'll add a placeholder image URL for now
const noprofile = "https://placehold.co/40x40/FF7F50/FFFFFF?text=U";

function NavBar() {
  // In the future, user data will come from props or context
  const user = {
    id: 'user123',
    role: 'NGO',
    name: 'Test User'
  };

  return (
    <div className="topnav">
      <div className="nav-left">
        <span className="logo">Logo</span>
      </div>

      <div className="nav-right">
        <span className="user-info">User ID: {user.id}</span>
        <span className="user-info">Role: {user.role}</span>
        <span className="user-info">Name: {user.name}</span>
        <img src={noprofile} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
}

export default NavBar;
