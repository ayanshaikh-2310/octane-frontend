import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, User, Lock } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo purposes, we just redirect to the dashboard
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
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
          <h2>Admin Login</h2>
          <p>Login to manage your gym dashboard</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                id="email"
                className="form-input"
                placeholder="admin@gfcgym.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Sign In
          </button>
        </form>
        <div className="auth-footer">
          Don't have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Register here
          </span>
        </div>
      </div>
    </div>
  );
}
