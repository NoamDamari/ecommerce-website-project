import { UserContext } from "../context/UserContext";
import { useContext, useEffect } from "react";
import { userLogin, userRegister } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { user, token, setUser, setToken, setIsLoading } =
    useContext(UserContext);
  const navigate = useNavigate();

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
      const { user, token } = await userLogin(email, password);
      setUser(user);
      setToken(token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user registration and store user and token in state and session storage
  const handleUserRegister = async (username, email, password) => {
    setIsLoading(true);
    try {
      const { user, token } = await userRegister(username, email, password);
      setUser(user);
      setToken(token);
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user sign out and remove user and token from state and session storage
  const handleUserSignOut = () => {
    setIsLoading(true);
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setIsLoading(false);
    navigate("/");
  };

  return {
    user,
    handleUserLogin,
    handleUserRegister,
    handleUserSignOut,
  };
};
