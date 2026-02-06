import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    // For demo purposes, we redirect to login
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Dumbbell
            className="brand-icon"
            size={48}
            style={{ margin: "0 auto" }}
          />
          <h2>Create Account</h2>
          <p>Register as a new gym administrator</p>
        </div>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <input
              type="text"
              id="username"
              className="form-input"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="admin@gfcgym.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Register Now
          </button>
        </form>
        <div className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
}
