import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleShowCart = () => setShowCart(true);
  const handleCloseCart = () => setShowCart(false);

  const addToCart = (product, quantityToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      // Update
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        // Add
        return [...prevItems, { ...product, quantity: quantityToAdd }];
      }
    });
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }

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
        getTotalItemsInCart
      }}
    >
      {" "}
      {children}
    </CartContext.Provider>
  );
};
