import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import "./logincss.css";
import { auth, signInWithEmailAndPassword } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Role is still needed for navigation
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!role || role === "--Select--") {
      setError("Please select a role to continue.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Force refresh the token to get the latest custom claims (role)
      const idToken = await user.getIdToken(true);

      // Storing these is useful for the NavBar, but the token is the source of truth
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("firebaseToken", idToken);

      // Navigate based on role
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
          <p>Hello</p>
        </div>
        
        <form className="auth-form" onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          {/* This dropdown is required for navigation but not in the UI image.
              We'll keep it for functionality. You can decide to remove it
              if you implement role-detection differently later. */}
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

