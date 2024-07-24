import React, { useEffect, useState , useContext } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { ProductsContext } from "../../context/productsContext";
import "./ProductsContainer.css";

const ProductsContainer = () => {
  
   // Products context values
  const {filteredProductsList} = useContext(ProductsContext)

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

