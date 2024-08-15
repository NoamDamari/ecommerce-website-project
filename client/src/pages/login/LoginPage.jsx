import React from "react";
import "./LoginPage";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Form from "../../components/form/Form";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  
  const { isLoading } = useContext(UserContext);
  const { handleUserLogin } = useAuth(UserContext);

  const fields = [
    {
      id: "login-email",
      label: "Email address",
      type: "email",
      autoComplete: "current-email",
    },
    {
      id: "login-password",
      label: "Password",
      type: "password",
      autoComplete: "current-password",
    },
  ];

  const handleSubmit = async (formData) => {
    const email = formData["login-email"];
    const password = formData["login-password"];
    await handleUserLogin(email, password);
  };

  return (
    <div>
      <Form
        title={"Sign In"}
        fields={fields}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default LoginPage;
