import React, { useState , useContext } from "react";
import "./RegistrationForm.css";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleUserLogin } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { id, value } = event.target;

    if (id === "username") {
      setUsername(value);
    }
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      handleUserLogin(response.data.user)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="card register-form-card">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-3">Register</h3>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            autoComplete="username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            autoComplete="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            autoComplete="password"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
