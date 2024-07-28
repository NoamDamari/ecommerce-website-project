import { createContext, useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState(["All items"]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [rating, setRating] = useState(0);

  // Ref to track if products have been fetched
  const isFetched = useRef(false);

  // Fetch products from API and update state.
  const fetchProducts = useCallback(async () => {
    try {
      const url = "/api/products";
      const response = await axios.get(url);
      setProductsList(response.data);
      setFilteredProductsList(response.data);
      setIsLoading(false);

      console.log("Products fetched successfully");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  // Handle product selection
  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  // Handle category selection and filter products accordingly.
  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
  };

  // Handle price range selection and filter products accordingly.
  const handlePriceRangeSelect = (priceRange) => {
    setPriceRange(priceRange);
  };

  // Handle rating selection and filter products accordingly.
  const handleRatingSelect = (rating) => {
    setRating(rating);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategories, priceRange, rating]);

  // Apply filters to products list
  const applyFilters = () => {
    let filteredProducts = productsList;

    // Filter by categories
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes("all-categories")) {
        filteredProducts = filteredProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }
    }
    // Filter by price range
    if (priceRange.length === 2 && !(priceRange[0] === 0 && priceRange[1] === Infinity)) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }
    // Filter by rating
    if (rating !== null) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= rating
      );
    }

    setFilteredProductsList(filteredProducts);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories(["all-categories"]);
    setPriceRange([0, Infinity]);
    setRating(null);
    setFilteredProductsList(productsList);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        filteredProductsList,
        selectedProduct,
        selectProduct,
        selectedCategories,
        isLoading,
        isFetched,
        fetchProducts,
        handleCategorySelect,
        handlePriceRangeSelect,
        handleRatingSelect,
        resetFilters,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
