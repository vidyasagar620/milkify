import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "../styles/SavePassword.css";  // Make sure the CSS file exists

const SavePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  // Watch the new password field to compare with the confirm password field
  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    // Check if data exists and is valid
    if (data) {
      setMessage("Your password has been successfully updated.");
    
      // Simulate a delay before navigating to the login page
      setTimeout(() => {
        // Redirect to the login page after the password is saved
        navigate("/");  // Navigates to the Login page ("/" is the root path)
      }, 2000);  // Adjust the delay as needed
    } else {
      setMessage("There was an error with your form submission.");
    }
  };

  return (
    <div className="save-password-container">
      <div className="save-password-box">
        <h2>Save New Password</h2>
        {message && <p className="success-message">{message}</p>}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>New Password</label>
            <input
              type="password"
              {...register("newPassword", { required: "Password is required" })}
              className="input-field"
              placeholder="Enter new password"
            />
            {errors.newPassword && <p className="error-message">{errors.newPassword.message}</p>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === newPassword || "Passwords do not match"
              })}
              className="input-field"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SavePassword;
