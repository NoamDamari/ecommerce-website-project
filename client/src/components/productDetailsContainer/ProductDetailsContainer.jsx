import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetailsContainer.css";
import QuantitySelector from "../quantitySelector/QuantitySelector";
import { useContext, useState} from "react";
import { ProductsContext } from "../../context/ProductsContext";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";

const ProductDetailsContainer = () => {
  const { selectedProduct } = useContext(ProductsContext);
  const { selectProduct } = useProducts();
  const { handleAddToCart } = useCart();
  const { user } = useContext(UserContext);

  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(selectedProduct?.price || 0);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setPrice(selectedProduct.price * newQuantity);
  };

  const handleAddToCartClick = () => {
    if (user) {
      handleAddToCart(selectedProduct, quantity);
    } else {
      alert("You need to login first");
    }
  };

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container product-detailes-container">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={selectedProduct.images[0]}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title product-title">
                {selectedProduct.title}
              </h3>
              <strong>Decription</strong>
              <p className="card-text product-description">
                {selectedProduct.description}
              </p>
              <strong>Brand</strong>
              <p className="card-text product-description">
                {selectedProduct.brand}
              </p>
              <QuantitySelector
                initialQuantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
              <p className="card-text">
                <strong>Total Price: </strong>
                <small className="text-body-secondary">
                  {price.toFixed(2)}
                </small>
              </p>
              <button className="btn btn-dark" onClick={handleAddToCartClick}>
                {" "}
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
