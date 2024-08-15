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
    await axios.post(
      `${API_URL}/add`,
      { userId, product },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Product added to cart successfully");
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
};

// Updates the quantity of an item in the user's cart
export const updateCartItem = async (userId, token, item, newQuantity) => {
  try {
    await axios.patch(
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
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

// Updates multiple items in the user's cart
export const updateMultipleCartItems = async (userId, token, items) => {
  try {
    await axios.patch(
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
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

// Removes an item from the user's cart
export const removeItemFromCart = async (userId, token, itemId) => {
  try {
    await axios.delete(`${API_URL}/delete/${userId}/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Cart item removed successfully");
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};
