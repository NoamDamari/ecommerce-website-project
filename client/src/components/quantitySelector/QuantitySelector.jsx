import "./QuantitySelector.css";
import React from "react";
import { useState , useEffect} from "react";

const QuantitySelector = ({initialQuantity , onQuantityChange}) => {
  const [quantity, setQuantity] = useState(initialQuantity || 1);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  useEffect(() => {
    // Notify parent about the quantity change
    onQuantityChange(quantity);
  }, [quantity]);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
  };


  return (
    <div className="quantity-control">
    <button className="quantity-button" onClick={decreaseQuantity}>
      <strong>-</strong>
    </button>
    <span className="quantity-display">{quantity}</span>
    <button className="quantity-button" onClick={increaseQuantity}>
      <strong>+</strong>
    </button>
  </div>
  );
};

export default QuantitySelector;
