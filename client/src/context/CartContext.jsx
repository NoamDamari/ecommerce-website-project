import { createContext, useEffect, useState , useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  useEffect(() => {
    if (user) {
      fetchCartItems(user.id);
    }
    else {
      setCartItems([])
    }
  }, [user]);

  const fetchCartItems = async (userId) => {
    try {
      const response = await axios.get(`api/cart/cart/${userId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  // Add a product to the cart
  const addToCart = async (product, quantityToAdd, userId) => {
    try {
      // Send request to add a product to the cart on the server
      await axios.post("/api/cart/add", {
        userId: userId,
        ...product,
        quantity: quantityToAdd,
      });

      // Update local cart state
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          // Update quantity if item already exists in cart
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantityToAdd }
              : item
          );
        } else {
          // Add new item to cart
          return [...prevItems, { ...product, quantity: quantityToAdd }];
        }
      });
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  // Update the quantity of a cart item
  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove an item from the cart
  const removeFromCart = async (itemId) => {
    const userId = user.id
    console.log("Deleting item with ID:", itemId);
    try {
      // Send request to remove an item from the cart on the server
      await axios.delete(`/api/cart/delete/${userId}/${itemId}`);

      // Update local cart state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to get the total number of items in the cart
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        showCart,
        handleShowCart,
        handleCloseCart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        getTotalItemsInCart,
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};
