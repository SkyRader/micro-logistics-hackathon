import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./logincss.css"; // We can reuse the same CSS as the login page

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!role || role === "--Select--") {
      setError("Please select a role (NGO or Provider).");
      return;
    }

    try {
      // Step 1: Create the user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();

      // Step 2: Call backend to assign the role
      const roleResponse = await fetch("http://localhost:5000/common/register_role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({ role: role.toLowerCase() }),
      });

      if (!roleResponse.ok) {
        throw new Error("Failed to set user role on the server. Is the backend running?");
      }

      alert("Sign up successful! Please log in.");
      navigate("/");

    } catch (error) {
      console.error("Signup failed:", error);
      
      // 3. Set a user-friendly error message based on the error code
      if (error.code === 'auth/invalid-email') {
        setError("Invalid email format. Please check and try again.");
      } else if (error.code === 'auth/weak-password') {
        setError("Password is too weak. It should be at least 6 characters.");
      } else if (error.code === 'auth/email-already-in-use') {
        // This is the new, more specific error message
        setError("This email is already registered. Please log in instead.");
      } else {
        // The generic error now suggests checking the backend server
        setError("Signup failed. Please ensure the backend server is running and check the console for more details.");
      }
    }
  };

  return (
    <div className="loginbox">
      <div className="logobox">
        <p style={{textAlign: 'center', color: 'white', fontSize: '2em', paddingTop: '50px'}}>Create Account</p>
      </div>
      <form onSubmit={handleSignup}>
        {error && <p style={{ color: 'red', textAlign: 'center', padding: '10px' }}>{error}</p>}

        <select className="formbox" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option>--Select--</option>
          <option>NGO</option>
          <option value="Donor">Provider</option>
        </select>
        <input
          className="formbox"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="formbox"
          placeholder="Enter password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/">Already have an account? Sign In</Link>
        </div>
        <br />
        <input className="submit" type="submit" value="SIGN UP" />
      </form>
    </div>
  );
}

export default Signup;

