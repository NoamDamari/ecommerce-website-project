import React, { useEffect} from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLoading } from "../../hooks/useLoading";
import ProductsContainer from "../../components/productsContainer/ProductsContainer";
import SideBar from "../../components/sidebar/SideBar";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import "./ProductsPage.css";

const ProductsPage = () => {
  // Products context values
  const { isFetched, fetchProducts } = useFetch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  // Effect to fetch products if not already fetched
  useEffect(() => {

    if (!isFetched.current) {
      startLoading();
      fetchProducts().finally(() => stopLoading());
      isFetched.current = true;
    }
  }, [fetchProducts, isFetched]);

  // Show loading indicator
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="product-page-container">
      <SideBar className="sidebar" />
      <ProductsContainer className="products-container" />
    </div>
  );
};

export default ProductsPage;
