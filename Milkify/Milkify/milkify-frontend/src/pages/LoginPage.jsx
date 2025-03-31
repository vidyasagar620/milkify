import { useState } from "react";
import "../styles/LoginPage.css"; // If it's in a styles folder

import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="milkyfy-logo-png" alt="Milkify Logo" className="login-logo" />
        <h2 className="login-title">Login</h2>
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <input type="email" placeholder="enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" />
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
        <button type="submit" className="login-button">Login</button>
      </form>
      <div className="login-links">
          <button onClick={() => navigate("/forgot-password")} className="forgot-password-link">
            Forgot Password?
          </button>
          <button onClick={() => navigate("/signup")} className="signup-link">
            Signup
          </button>
        </div>
    </div>
    </div>
    </div>
  );
}
