import React, { useEffect, useState, useContext } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { ProductsContext } from "../../context/ProductsContext";
import "./ProductsContainer.css";

const ProductsContainer = () => {
  
  const { filteredProductsList } = useContext(ProductsContext);

  return (
    <div className="product-grid">
      {filteredProductsList.map((product) => (
        <div key={product.id} className="product-grid-item">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductsContainer;
