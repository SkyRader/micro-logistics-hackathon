import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./logincss.css";
import { auth, signInWithEmailAndPassword } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add error state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // --- THIS IS THE CRITICAL FIX ---
      // The `true` argument forces a token refresh from the server,
      // ensuring we get the latest custom claims (like the role).
      const idTokenResult = await user.getIdTokenResult(true);
      
      // Now, get the role directly from the token's claims
      const userRole = idTokenResult.claims.role;

      if (!userRole) {
        throw new Error("No role assigned to this user account.");
      }

      // Store the fresh token and user info
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("firebaseToken", idTokenResult.token);

      // Navigate based on the role from the token
      if (userRole === "ngo") {
        navigate("/ngo-dashboard");
      } else if (userRole === "donor") {
        navigate("/donor-dashboard");
      } else {
        // This case should ideally not be reached
        setError("Role not recognized.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="loginbox">
      <div className="logobox">
        <p style={{textAlign: 'center', color: 'white', fontSize: '2em', paddingTop: '50px'}}>Hello</p>
      </div>
      <form onSubmit={handleLogin}>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        
        <input
          className="formbox"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="formbox"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Link to="/signup">Don't have an account? Sign up</Link>
          <a href="#fp">Forgot password</a>
        </div>
        
        <br />
        <br />
        <input className="submit" type="submit" value="LOGIN" />
      </form>
    </div>
  );
}

export default Login;

