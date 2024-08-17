import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../context/ProductsContext";

export const useFilters = () => {
  const { productsList, setFilteredProductsList } = useContext(ProductsContext);
  const [selectedCategories, setSelectedCategories] = useState([
    "all-categories",
  ]);
  const [priceRange, setPriceRange] = useState([0, Infinity]);
  const [rating, setRating] = useState(0);

  // Handle category selection and filter products accordingly
  const handleCategorySelect = (categories) => {
    setSelectedCategories(categories);
  };

  // Handle price range selection and filter products accordingly
  const handlePriceRangeSelect = (priceRange) => {
    setPriceRange(priceRange);
  };

  // Handle rating selection and filter products accordingly
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
    if (
      priceRange.length === 2 &&
      !(priceRange[0] === 0 && priceRange[1] === Infinity)
    ) {
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

  return {
    handleCategorySelect,
    handlePriceRangeSelect,
    handleRatingSelect,
    resetFilters,
  };
};
