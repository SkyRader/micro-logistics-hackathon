import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; // 1. Import Signup
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import NavBar from "./components/NavBar";

function AppWrapper() {
  const location = useLocation();
  // Hide navbar on both login and signup pages
  const hideNavbar = location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* 2. Add route for Signup */}
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/ngo-dashboard" element={<NGODashboard />} />
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
