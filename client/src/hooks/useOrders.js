import { getUserOrders } from "../services/ordersService";
import { useContext , useEffect } from "react";
import { UserContext } from "../context/UserContext";

export const useOrders = () => {
  const { user, token, setUserOrders } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      handleGetUserOrders(user.id, token);
    } else {
      setUserOrders([]);
    }
  }, [user, token]);

  const handleGetUserOrders = async (userId , token) => {
    const userOrders = await getUserOrders(userId, token);
    setUserOrders(userOrders);
  };
};
