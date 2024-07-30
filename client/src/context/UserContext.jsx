import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user and token from session storage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  // Handle user login and store user and token in state and session storage
  const handleUserLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user registration and store user and token in state and session storage
  const handleUserRegister = async (username, email, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      console.log(response.data);

      if (response.status === 200) {
        const { user, token } = response.data;
        setUser(user);
        setToken(token);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("token", token);
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user sign out and remove user and token from state and session storage 
  const handleUserSignOut = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        handleUserLogin,
        handleUserRegister,
        handleUserSignOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
