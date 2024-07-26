import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./CartItem.css";
import grey_bg from "../../assets/grey_bg.png";
import { useContext, useState , useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import QuantitySelector from "../quantitySelector/QuantitySelector";

import React from "react";

const CartItem = ({ item }) => {
  const { removeFromCart , updateCartItemQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity || 1);
  const [price , setPrice] = useState(item.price * item.quantity || 0)
 
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);


  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setPrice(item.price*newQuantity)
    updateCartItemQuantity(item.id , newQuantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-lg-4">
          <img
            src={item.images[0]}
            className="img-fluid rounded-start cart-item-img"
            alt="Cart item image"
          />
        </div>
        <div className="col-lg-8">
          <div className="card-body">
            <div className="d-flex justify-content-between  mb-2">
              <h5 className="card-title m-0">{item.title}</h5>
              <button
                type="button"
                className="btn-close remove-item-btn"
                aria-label="Close"
                onClick={handleRemoveFromCart}
              >
                <i className="bi bi-x close-icon"></i>
              </button>
            </div>
            <QuantitySelector
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
            <p className="card-text">
              <small className="text-body-secondary">Price: {price.toFixed(2)}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
