import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import MyClaims from "./pages/MyClaims"; // Import the new MyClaims component
import NavBar from "./components/NavBar";

function AppWrapper() {
  const location = useLocation();
  // Hide the navbar on the login and signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
        <Route path="/my-claims" element={<MyClaims />} /> {/* Add the new route here */}
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

