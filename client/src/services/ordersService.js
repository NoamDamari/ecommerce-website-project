import axios from "axios";

const API_URL = "/api/orders";

// Add new order
export const addOrder = async (userId, token, orderData) => {
  try {
    const response = await axios.post(
      `${API_URL}/addOrder`,
      { userId, orderData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {success: true , response: response};
  } catch (error) {
    console.error("Error adding order:", error);
  }
};

// Get all user's orders data
export const getUserOrders = async (userId , token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error getting user orders data:", error);
  }
};
