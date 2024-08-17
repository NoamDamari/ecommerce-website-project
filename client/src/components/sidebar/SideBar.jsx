import React from "react";
import "./SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../filterSection/FilterSection";
import FilterSection from "../filterSection/FilterSection";
import { useState } from "react";
import {
  priceRangeOptions,
  ratingOptions,
  techCategoriesOptions,
} from "../../data/filterOptions";
import { useFilters } from "../../hooks/useFilters";

const SideBar = () => {
  const {
    handleCategorySelect,
    handlePriceRangeSelect,
    handleRatingSelect,
    resetFilters,
  } = useFilters();

  const [reset, setReset] = useState(false);

  const handleReset = () => {
    resetFilters();
    setReset(true);
    // Reset the state to allow the effect to run
    setTimeout(() => setReset(false), 0);
  };

  return (
    <div className="sidebar-container">
      <button className="btn btn-dark reset-btn" onClick={handleReset}>
        Reset Filters
      </button>
      <FilterSection
        title={"Categories"}
        options={techCategoriesOptions}
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
