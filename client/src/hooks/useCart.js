import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import {
  fetchCartItems,
  addToCart,
  updateCartItem,
  updateMultipleCartItems,
  removeItemFromCart,
} from "../services/cartService";

export const useCart = () => {
  const { user, token } = useContext(UserContext);
  const { cartItems, setCartItems, showCart, setShowCart } =
    useContext(CartContext);

  // Toggle cart visibility
  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  // Fetch cart items when user or token changes
  useEffect(() => {
    if (user && token) {
      loadCartItems(user.id, token);
    } else {
      setCartItems([]);
    }
  }, [user, token]);

  // Load cart items from the server
  const loadCartItems = async (userId, token) => {
    const items = await fetchCartItems(userId, token);
    setCartItems(items);
  };

  // Add a product to the cart or update its quantity
  const handleAddToCart = async (product, quantity) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      await handleUpdateCartItem(product, newQuantity);
    } else {
      const newProduct = {
        ...product,
        quantity: quantity,
      };

      await addToCart(user.id, token, newProduct);
      setCartItems((prevItems) => [...prevItems, newProduct]);
    }
  };

  // Update the quantity of an existing cart item
  const handleUpdateCartItem = async (product, newQuantity) => {
    await updateCartItem(user.id, token, product, newQuantity);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === product.id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Update multiple cart items
  const handleUpdateMultipleCartItems = async (items) => {
    try {
      // Update items in the cart on the server
      await updateMultipleCartItems(user.id, token, items);
  
      // Update the local state
      setCartItems((prevItems) => {
    
        const itemsToUpdate = new Map(items.map(item => [item.id, item]));
  
        // Map through the previous items and update them
        return prevItems.map((item) =>
          itemsToUpdate.has(item.id) 
            ? { ...item, quantity: itemsToUpdate.get(item.id).quantity }
            : item
        );
      });
    } catch (error) {
      console.error("Error updating multiple cart items:", error);
    }
  };

  // Remove an item from the cart
  const handleRemoveItemFromCart = async (itemId) => {
    await removeItemFromCart(user.id, token, itemId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Function to get the total number of items in the cart
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cartItems,
    showCart,
    handleShowCart,
    handleCloseCart,
    handleAddToCart,
    handleUpdateCartItem,
    handleUpdateMultipleCartItems,
    handleRemoveItemFromCart,
    getTotalItemsInCart,
  };
};
