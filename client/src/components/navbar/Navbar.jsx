import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, handleUserSignOut } = useAuth();
  const { cartItems, handleShowCart } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          TechShop
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/about">
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <div className="d-flex align-items-center me-3">
                <span className="me-3 d-flex align-items-center username-text">
                  <i className="bi bi-person-fill me-2"></i>
                  {user.username}
                </span>

                <Link to="/orders">
                  <button className="btn-outline-warning me-2 ms-2">
                    <i className="bi bi-bag-fill me-2"></i>My Orders
                  </button>
                </Link>

                <button
                  className="btn-outline-dark"
                  onClick={handleUserSignOut}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-outline-light me-2">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-outline-light">
                  Sign Up
                </Link>
              </div>
            )}
            <button
              type="button"
              className="btn btn-light position-relative ms-3"
              onClick={handleShowCart}
            >
              <i className="bi bi-cart"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {totalItems}
                  <span className="visually-hidden">Items in cart</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
