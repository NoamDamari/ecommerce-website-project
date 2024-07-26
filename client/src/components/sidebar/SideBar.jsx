import React, { useContext } from "react";
import "./SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../filterSection/FilterSection";
import { ProductsContext } from "../../context/ProductsContext";
import FilterSection from "../filterSection/FilterSection";
import { useState } from "react";
import { categoryOptions, priceRangeOptions, ratingOptions } from "../../data/filterOptions";


const SideBar = () => {
  // Products context values
  const {
    handleCategorySelect,
    handlePriceRangeSelect,
    handleRatingSelect,
    resetFilters,
  } = useContext(ProductsContext);

  const [reset, setReset] = useState(false);

  const handleReset = () => {
    resetFilters();
    setReset(true);
    // Reset the state to allow the effect to run
    setTimeout(() => setReset(false), 0);
  };

  return (
    <div className="bg-body-tertiary sidebar-container">
      <button className="btn btn-dark reset-btn" onClick={handleReset}>
        Reset Filters
      </button>
      <FilterSection
        title={"Categories"}
        options={categoryOptions}
        onSelect={handleCategorySelect}
        reset={reset}
      />
      <FilterSection
        title={"Price"}
        options={priceRangeOptions}
        onSelect={handlePriceRangeSelect}
        reset={reset}
      />
      <FilterSection
        title={"Rating"}
        options={ratingOptions}
        onSelect={handleRatingSelect}
        reset={reset}
      />
    </div>
  );
};
export default SideBar;


