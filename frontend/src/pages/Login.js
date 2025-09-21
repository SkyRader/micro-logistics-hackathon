import React, { useState } from "react";
import "./logincss.css";
import { auth, signInWithEmailAndPassword } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async () => {
    if (!role || role === "--Select--") {
      alert("Please select a role");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Optional: Save user info & role in localStorage
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", role);

      alert(`Login successful as ${role}`);
      // Redirect to dashboard or home page
      // e.g., window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="loginbox">
      <div className="logobox">
        <p>Hello</p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <select className="dropdown" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>--Select--</option>
          <option>NGO</option>
          <option>Provider</option>
        </select>
        <input
          className="formbox"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label style={{ fontSize: "large" }}>Password:</label>
        <input
          type="password"
          className="formbox"
          placeholder="Enter password"
          style={{ width: 406 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <a style={{ float: "left" }}>Don't have an account?</a>
        <a href="#su">Sign up</a>
        <a style={{ float: "right" }} href="#fp">
          Forgot password
        </a>
        <br />
        <br />
        <input
          className="submit"
          type="button"
          value="LOGIN"
          onClick={handleLogin}
        />
      </form>
    </div>
  );
}

export default Login;
