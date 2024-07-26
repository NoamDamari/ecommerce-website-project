import CartItem from "../cartItem/CartItem";
import "./CartContainer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CartContainer = () => {
  const { cartItems, handleCloseCart, showCart } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className={`cart-container ${showCart ? "show" : ""}`}>
      <div className="cart-header">
        <h5 className="cart-title">Shopping Cart</h5>
        <button
          onClick={handleCloseCart}
          type="button"
          className="btn-close"
          aria-label="Close"
        >
          <i className="bi bi-x close-icon"></i>
        </button>
      </div>
      <div className="cart-body">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id}>
              <CartItem item={item} />
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
        <div className="container cart-buttom-container">
          <h5 id="total-price">
            Total Price: <strong>{totalPrice.toFixed(2)}</strong>
          </h5>
          <button type="button" className="btn btn-success buy-items-btn">
            Buy Items
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContainer;
