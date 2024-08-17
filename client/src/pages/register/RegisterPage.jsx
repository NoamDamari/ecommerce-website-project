import React from "react";
import "./RegisterPage.css";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import Form from "../../components/form/Form";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {
  const { isLoading } = useContext(UserContext);
  const { handleUserRegister } = useAuth();

  const fields = [
    {
      id: "register-username",
      label: "Username",
      type: "text",
      autoComplete: "username",
    },
    {
      id: "register-email",
      label: "Email address",
      type: "email",
      autoComplete: "email",
    },
    {
      id: "register-password",
      label: "Password",
      type: "password",
      autoComplete: "new-password",
    },
  ];

  const handleSubmit = async (formData) => {
    const username = formData["register-username"];
    const email = formData["register-email"];
    const password = formData["register-password"];
    await handleUserRegister(username, email, password);
  };

  return (
    <div>
      <Form
        title={"Sign Up"}
        fields={fields}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RegisterPage;
