import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        userOrders,
        setUserOrders,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
