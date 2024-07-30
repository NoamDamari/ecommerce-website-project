import React, { useContext } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useState } from "react";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const { handleUserLogin , isLoading } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    if (id === "login-email") {
      setEmail(value);
    }
    if (id === "login-password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUserLogin(email , password)
  };

  return (
    <div className="card login-form-card">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-3">Login</h3>
        <div className="mb-3">
          <label htmlFor="login-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="login-email"
            autoComplete="current-email"
            aria-describedby="emailHelp"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="login-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="login-password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
