import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import NavBar from "./components/NavBar";

function AppWrapper() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // hide Navbar on Login page

  return (
    <>
      {!hideNavbar && <NavBar />} {/* show Navbar on all pages except Login */}
      <Routes>
        <Route path="/" element={<Login />} />
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
