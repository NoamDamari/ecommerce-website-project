import React, { useEffect, useContext } from "react";
import { ProductsContext } from "../../context/ProductsContext";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import SideBar from "../../components/sidebar/SideBar";
import "./ProductsPage.css";


const ProductsPage = () => {
  // Products context values
  const { isFetched, fetchProducts, isLoading } = useContext(ProductsContext);

  // Effect to fetch products if not already fetched
  useEffect(() => {
    if (!isFetched.current) {
      fetchProducts();
      isFetched.current = true;
    }
  }, [fetchProducts, isFetched]);

  // Show loading indicator
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page-container">
      <SideBar className="sidebar" />
      <ProductsContainer className="products-container" />
    </div>
  );
};

export default ProductsPage;

