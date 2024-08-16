import { ProductsContext } from "../context/ProductsContext";
import { useCallback, useContext, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const {
    setProductsList,
    setSelectedProduct,
    setFilteredProductsList,
    isFetched,
  } = useContext(ProductsContext);

  // Fetch products from API and update state
  const fetchProducts = useCallback(async () => {
    try {
      const url = "/api/products";
      const response = await axios.get(url);
      setProductsList(response.data);
      setFilteredProductsList(response.data);
      console.log("Products fetched successfully");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  const selectProduct = (product) => {
    setSelectedProduct(product);
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
  };

  useEffect(() => {
    const storedProduct = sessionStorage.getItem("selectedProduct");
    if (storedProduct) {
      const product = JSON.parse(storedProduct);
      setSelectedProduct(product);
    }
  }, []);

  return { isFetched, fetchProducts, selectProduct };
};
