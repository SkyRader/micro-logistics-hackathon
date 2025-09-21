import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase auth functions
import './NavBar.css'; 
import noprofile from "./noprofile.png"; // Assuming you have this image

function NavBar() {
  // 1. Add state to hold the user's dynamic information
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  
  const navigate = useNavigate();

  // 2. Use useEffect to run code once when the component mounts
  useEffect(() => {
    // Read the user's data from localStorage
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('userRole');

    // If the data exists, update our state
    if (email) {
      setUserEmail(email);
    }
    if (role) {
      // Capitalize the first letter for better display (e.g., "ngo" -> "Ngo")
      setUserRole(role.charAt(0).toUpperCase() + role.slice(1));
    }
  }, []); // The empty array [] means this effect runs only once

  // 3. Create the logout handler function
  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth); // Sign the user out of Firebase
      // Clear all user data from localStorage
      localStorage.removeItem('firebaseToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error("Failed to log out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="topnav">
      <div className="nav-left">
        {/* You can replace this with your actual logo component or image later */}
        <span className="logo">The Food Fix</span>
      </div>

      <div className="nav-right">
        {/* 4. Display the dynamic user data from state */}
        <span className="user-info">Email: {userEmail}</span>
        <span className="user-info">Role: {userRole}</span>
        
        {/* 5. Add a clickable logout button */}
        <span onClick={handleLogout} className="logout-button">Logout</span>

        <img src={noprofile} alt="Profile" className="profile-img" />
      </div>
    </div>
  );
}

export default NavBar;

