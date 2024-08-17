import CartItem from "../cartItem/CartItem";
import "./CartContainer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useCart } from "../../hooks/useCart";

const CartContainer = () => {
  const {
    cartItems,
    handleCloseCart,
    handleClearCart,
    showCart,
    handleUpdateMultipleCartItems,
    handleBuyItems,
    getTotalItemsInCart,
  } = useCart();

  const debounceTimeoutRef = useRef(null);
  const [updatedItems, setUpdatedItems] = useState([]);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Debounced function to update multiple cart items
  const debouncedUpdateCartItems = useCallback(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      handleUpdateMultipleCartItems(updatedItems);
      setUpdatedItems([]);
    }, 2000);
  }, [updatedItems, handleUpdateMultipleCartItems]);

  // Effect to trigger debounced update when updatedItems changes
  useEffect(() => {
    if (updatedItems.length > 0) {
      debouncedUpdateCartItems();
    }
  }, [updatedItems]);

  // Handle quantity change of a cart item
  const handleQuantityChange = (productId, newQuantity) => {
    setUpdatedItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === productId);
      if (itemIndex !== -1) {
        const updatedItem = { ...prevItems[itemIndex], quantity: newQuantity };
        const newUpdatedItems = [...prevItems];
        newUpdatedItems[itemIndex] = updatedItem;
        return newUpdatedItems;
      } else {
        return [...prevItems, { id: productId, quantity: newQuantity }];
      }
    });
  };

  const handleBuyItemsClick = () => {
    const itemsQuantity = getTotalItemsInCart();
    const orderData = {
      items: cartItems,
      totalPrice: totalPrice,
      itemsQuantity: itemsQuantity,
    };
    handleBuyItems(orderData);
  };

  const handleClearCartClick = () => {
    handleClearCart();
  };

  return (
    <div className={`cart-container ${showCart ? "show" : ""}`}>
      <div className="cart-header">
        <h5 className="cart-title">Shopping Cart</h5>
        <div className="buttons-container">
          <button
            onClick={handleClearCartClick}
            type="button"
            className="btn-close"
            aria-label="Close"
          >
            <i className="bi bi-trash"></i>
          </button>
          <button
            onClick={handleCloseCart}
            type="button"
            className="btn-close"
            aria-label="Close"
          >
            <i className="bi bi-x close-icon"></i>
          </button>
        </div>
      </div>
      <div className="cart-body">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id}>
              <CartItem item={item} onQuantityChange={handleQuantityChange} />
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="cart-buttom-container">
          <h5 id="total-price">
            Total Price: <strong>{totalPrice.toFixed(2)}</strong>
          </h5>
          <button
            type="button"
            className="btn btn-light buy-items-btn"
            onClick={handleBuyItemsClick}
          >
            Buy Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
