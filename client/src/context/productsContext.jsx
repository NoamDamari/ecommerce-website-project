import { createContext, useState, useRef, useCallback } from "react";
import axios from "axios";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    
  const [productsList, setProductsList] = useState([]);
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(["All items"]);
  const [isLoading, setIsLoading] = useState(true);

  // Ref to track if products have been fetched
  const isFetched = useRef(false);

  //Fetch products from API and update state.
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

    if (categories.includes("All items")) {
      setFilteredProductsList(productsList);
    } else {
      const filteredProducts = productsList.filter((product) =>
        categories.includes(product.category)
      );
      setFilteredProductsList(filteredProducts);
    }
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
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
