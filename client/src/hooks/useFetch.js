import { ProductsContext } from "../context/ProductsContext";
import { useCallback, useContext } from "react";
import axios from "axios";

export const useFetch = () => {
  const {
    setProductsList,
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

  return { isFetched, fetchProducts };
};
