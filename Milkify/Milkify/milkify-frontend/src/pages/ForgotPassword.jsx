import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../styles/ForgotPassword.css";

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  const onSubmit = (data) => {
    setMessage(`Password reset link sent to ${data.email}`);
    // Redirect to the SavePassword page after submitting the email
    setTimeout(() => {
      navigate("/save-password");  // This should take you to /save-password
    }, 2000);  // Redirect after 2 seconds
  };
  // This function simulates sending a password reset link to the user's email.

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="input-field"
            placeholder="Enter your email"
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}

          <button type="submit" className="submit-btn">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
