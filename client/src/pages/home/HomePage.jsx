import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container page-container">
      <div className="container hero-container">
        <div className="text-container">
          <h1 className="hero-title">Welcome to ShopEasy</h1>
          <p className="hero-description">
            Your one-stop shop for all your needs.
            <br /> Explore our wide range of products and enjoy exclusive deals
            today!
          </p>
          <button type="hero-button" className="btn btn-primary hero-btn">
            <Link className="nav-link" to="/products">
              Start Shopping
            </Link>
          </button>
        </div>
        <img
          src="/cart_image.png"
          alt="Shopping Cart"
          className="hero-img"
        ></img>
      </div>
    </div>
  );
};

export default HomePage;
