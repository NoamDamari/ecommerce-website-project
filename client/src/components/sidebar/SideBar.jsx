import React, { useContext } from "react";
import "./SideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductsContext } from "../../context/productsContext";

const SideBar = () => {
  
  // Products context values
  const { handleCategorySelect } = useContext(ProductsContext);

  return (
    <div className="bg-body-tertiary sidebar-container">
      <h3 className="section-header">Categories</h3>
      <ul className="nav nav-underline flex-column">
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            aria-current="page"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect(["All items"]);
            }}
          >
            All items
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect([
                "mens-shirts",
                "mens-shoes",
                "mens-watches",
                "sunglasses",
                "motorcycle",
                "vehicle",
                "sports-accessories",
              ]);
            }}
          >
            Men
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect([
                "tops",
                "womens-bags",
                "womens-dresses",
                "womens-jewellery",
                "womens-shoes",
                "womens-watches",
                "beauty",
                "fragrances",
                "skin-care",
              ]);
            }}
          >
            Women
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect([
                "home-decoration",
                "kitchen-accessories",
                "furniture",
                "groceries",
              ]);
            }}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategorySelect([
                "smartphones",
                "laptops",
                "tablets",
                "mobile-accessories",
              ]);
            }}
          >
            Tech
          </a>
        </li>
      </ul>
      <h3 className="section-header">Prices</h3>
      <ul className="nav nav-underline flex-column">
        <li className="nav-item">
          <a
            className="nav-link link-body-emphasis"
            aria-current="page"
            href="#"
          >
            0 - 500
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link link-body-emphasis" href="#">
            500 - 1000
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link link-body-emphasis" href="#">
            1000 - 2000
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link link-body-emphasis" href="#">
            2000 - 10000
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
