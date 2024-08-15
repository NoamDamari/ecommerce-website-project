import { createContext, useState, useRef } from "react";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [productsList, setProductsList] = useState([]);
  const [filteredProductsList, setFilteredProductsList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Ref to track if products have been fetched
  const isFetched = useRef(false);

  // Handle product selection
  const selectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <ProductsContext.Provider
      value={{
        productsList,
        setProductsList,
        filteredProductsList,
        setFilteredProductsList,
        selectedProduct,
        selectProduct,
        isFetched,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
