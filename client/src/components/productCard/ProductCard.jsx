import React, { useContext } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { ProductsContext } from "../../context/productsContext";

const ProductCard = ({ product }) => {

  const {selectProduct} = useContext(ProductsContext)

  const handleProductClick = () => {
    selectProduct(product)
  }

  return (
    <div className="card product-card">
      <Link to={`/product/${product.id}`} className="card-link" onClick={handleProductClick}>
        <img src={product.images[0]} className="card-img-top product-image" />
      </Link>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <strong>Price:</strong>
        <p>{product.price}</p>
        <a href="/about" className="btn btn-primary">
          Add to cart
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
