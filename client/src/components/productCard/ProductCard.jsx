import React, { useContext } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";

const ProductCard = ({ product }) => {
  const { selectProduct } = useProducts();
  const { handleAddToCart } = useCart();
  const { user } = useContext(UserContext);

  const handleProductClick = () => {
    selectProduct(product);
  };

  const handleAddToCartClick = () => {
    if (user) {
      handleAddToCart(product, 1);
    } else {
      alert("You need to login first");
    }
  };

  return (
    <div className="card product-card">
      <Link
        to={`/product/${product.id}`}
        className="card-link"
        onClick={handleProductClick}
      >
        <img src={product.images[0]} className="card-img-top product-image" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <div className="card-price-rating">
          <div className="card-price">
            <strong>Price:</strong>
            <p>{product.price}</p>
          </div>
          <div className="card-rating">
            <strong>Rating:</strong>
            <p>{product.rating}</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleAddToCartClick}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
