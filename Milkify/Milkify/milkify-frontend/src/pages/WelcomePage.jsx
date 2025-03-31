import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomePage.css"; // Example if stored in styles folder

const WelcomePage = () => {
  const navigate = useNavigate();

  // Redirect to login after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1>Welcome to Milkify</h1>
      <p>Your trusted Dairy Management Solution</p>
    </div>
  );
};

export default WelcomePage;
