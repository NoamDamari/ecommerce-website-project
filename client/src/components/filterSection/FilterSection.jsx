import React, { useState, useEffect } from "react";
import "./FilterSection.css";

const FilterSection = ({ title, options, onSelect, reset }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (value) => {
    setSelectedOption(value);
    onSelect(value);
  };

  useEffect(() => {
    if (reset) {
      setSelectedOption(null);
    }
  }, [reset]);

  return (
    <div className="filter-section">
      <h4 className="section-title">{title}</h4>
      <ul className="nav nav-underline flex-column">
        {options.map((option, index) => (
          <li key={index} className="nav-item">
            <a
              className={`nav-link link-body-emphasis ${
                JSON.stringify(selectedOption) === JSON.stringify(option.value)
                  ? "active"
                  : ""
              }`}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleClick(option.value);
              }}
            >
              {option.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterSection;
