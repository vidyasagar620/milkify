import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/SignupPage.css";  // Ensure the CSS file exists

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  // Watch the password field to compare it with confirm password
  const password = watch("password");

  // Correctly handling form data inside the onSubmit function
  const onSubmit = (data) => {
    console.log(data);  // Log data to check if the form values are correctly captured
    // Simulate a signup process (you can replace this with an API call)
    setMessage("Signup successful! Redirecting to login page...");

    // Simulate a delay before navigating to the login page
    setTimeout(() => {
      // Redirect to the login page after signup
      navigate("/");  // Navigates to the Login page ("/" is the root path)
    }, 2000);  // Adjust the delay as needed
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="input-field"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email address"
                }
              })}
              className="input-field"
              placeholder="Enter your email"
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { 
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters"
                }
              })}
              className="input-field"
              placeholder="Enter your password"
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="input-field"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
