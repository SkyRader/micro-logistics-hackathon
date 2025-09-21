import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./logincss.css";
import { auth, signInWithEmailAndPassword } from "../firebase";
import logo from './logo.png'; // 1. IMPORT the image from the same folder

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!role || role === "") {
      setError("Please select a role to continue.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken(true);

      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("firebaseToken", idToken);

      if (role.toLowerCase() === "ngo") {
        navigate("/ngo-dashboard");
      } else if (role.toLowerCase() === "donor") {
        navigate("/donor-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="auth-background">
      <div className="auth-container">
        <div className="auth-header">
          {/* 2. USE the imported 'logo' variable here */}
          <img src={logo} alt="The Food Fix Logo" className="auth-logo" />
        </div>
        
        <form className="auth-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">-- Select Role --</option>
            <option value="NGO">NGO</option>
            <option value="Donor">Provider (Donor)</option>
          </select>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button className="submit-button" type="submit">LOGIN</button>

          <div className="form-links">
            <Link to="/signup">Don't have an account? Sign up</Link>
            <a href="#forgot">Forgot password</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

