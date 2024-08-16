import axios from "axios";

const API_URL = "/api/cart";

// Fetches the cart items for a given user
export const fetchCartItems = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/cart/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  }
};

// Adds a product to the user's cart
export const addToCart = async (userId, token, product) => {
  try {
    const response = await axios.post(
      `${API_URL}/add`,
      { userId, product },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Product added to cart successfully");
    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

// Updates the quantity of an item in the user's cart
export const updateCartItem = async (userId, token, item, newQuantity) => {
  try {
    const response = await axios.patch(
      `${API_URL}/update`,
      {
        userId,
        item,
        newQuantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cart item updated successfully");
    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { status: error.response?.status || 500, success: false, message: error.message };
  }
};

// Updates multiple items in the user's cart
export const updateMultipleCartItems = async (userId, token, items) => {
  try {
    const response = await axios.patch(
      `${API_URL}/update-items`,
      {
        userId,
        token,
        items,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Cart item updated successfully");
    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return { status: error.response?.status || 500, success: false, message: error.message };
  }
};

// Removes an item from the user's cart
export const removeItemFromCart = async (userId, token, itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${userId}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cart item removed successfully");
    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return { status: error.response?.status || 500, success: false, message: error.message };
  }
};

// Removes all item from the user's cart
export const clearCart = async(userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/clear/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cart cleared successfully");
    return { status: response.status, success: true };
  } catch (error) {
    console.error("Error clear cart:", error);
    return { status: error.response?.status || 500, success: false, message: error.message };
  }
};

