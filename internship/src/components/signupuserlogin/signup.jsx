import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./formpage.css";

function SignUpPage() {
  const [step, setStep] = useState("role");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep("account");
  };

  const handleNext = () => {
    if (!username || !password) {
      alert("Enter username and password");
      return;
    }
    handleSignup();
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert(data.msg || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during signup");
    }
  };

  return (
    <>
      {step === "role" && (
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">Select Signup Type</h2>
            <div className="auth-btn-group">
              <button className="auth-btn" onClick={() => handleRoleSelect("Student")}>🎓 Student</button>
              <button className="auth-btn" onClick={() => handleRoleSelect("Admin")}>🛠️ Admin</button>
              <button className="auth-btn" onClick={() => handleRoleSelect("Employer")}>🏢 Employer</button>
            </div>
            <p className="auth-footer">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}

      {step === "account" && (
        <div className="auth-container">
          <div className="auth-card">
            <h2 className="auth-title">{role} Signup</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
            <button className="auth-btn primary" onClick={handleNext}>
              Signup
            </button>
            <p className="auth-footer">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpPage;
