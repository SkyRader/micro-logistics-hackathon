import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- import useNavigate
import "./logincss.css";
import { auth, signInWithEmailAndPassword } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate(); // <-- hook for navigation

  const handleLogin = async () => {
    if (!role || role === "--Select--") {
      alert("Please select a role");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userRole", role);
      localStorage.setItem("firebaseToken", idToken);

      const response = await fetch(`http://localhost:5000/${role.toLowerCase()}/test`, {
        method: "GET",
        headers: { Authorization: idToken },
      });

      const data = await response.json();
      console.log("Backend response:", data);

      alert(`Login successful as ${role}`);

      // Navigate based on role
      if (role === "NGO") {
        navigate("/ngo-dashboard");
      } else if (role === "Provider") {
        navigate("/donor-dashboard");
      }
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
        <select className="formbox" value={role} onChange={(e) => setRole(e.target.value)}>
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
          style={{ width: 406, marginLeft: 10 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input className="formbox" placeholder="Phone number" />
        <a style={{ float: "left" }}>Don't have an account?</a>
        <a href="#su">Sign up</a>
        <a style={{ float: "right" }} href="#fp">
          Forgot password
        </a>
        <br />
        <br />
        <input className="submit" type="button" value="LOGIN" onClick={handleLogin} />
      </form>
    </div>
  );
}

export default Login;
