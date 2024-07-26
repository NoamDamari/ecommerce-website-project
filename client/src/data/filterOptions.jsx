import React from "react";

export const categoryOptions = [
  { label: "All Categories", value: "all-categories" },
  {
    label: "Men",
    value: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "sunglasses",
      "motorcycle",
      "vehicle",
      "sports-accessories",
    ],
  },
  {
    label: "Women",
    value: [
      "tops",
      "womens-bags",
      "womens-dresses",
      "womens-jewellery",
      "womens-shoes",
      "womens-watches",
      "beauty",
      "fragrances",
      "skin-care",
    ],
  },
  {
    label: "Home",
    value: ["home-decoration", "kitchen-accessories", "furniture", "groceries"],
  },
  {
    label: "Tech",
    value: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
];

export const priceRangeOptions = [
  { label: "All Prices", value: [0,Infinity] },
  { label: "0 - 50", value: [0, 50] },
  { label: "50 - 500", value: [50, 500] },
  { label: "500 - 1000", value: [500, 1000] },
  { label: "1000 +", value: [1000, Infinity] },
];

export const ratingOptions = [
  { label: "All Ratings", value: null },
  {
    label: (
      <div className="stars">
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
      </div>
    ),
    value: 4,
  },
  {
    label: (
      <div className="stars">
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
      </div>
    ),
    value: 3,
  },
  {
    label: (
      <div className="stars">
        <i className="bi bi-star star-icon"></i>
        <i className="bi bi-star star-icon"></i>
      </div>
    ),
    value: 2,
  },
  {
    label: (
      <div className="stars">
        <i className="bi bi-star star-icon"></i>
      </div>
    ),
    value: 1,
  },
];
