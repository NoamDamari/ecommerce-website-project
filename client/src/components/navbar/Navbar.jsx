import React from "react";
import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { useEffect , useState} from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {

  const { user, handleUserSignOut } = useAuth();
  const { cartItems ,handleShowCart } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          EasyShop
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
          <div className="buttons-container">
            {user && (
              <div className="me-4">
                <span className="me-4"><i className="bi bi-person-fill me-2"></i>{user.username}</span>
                <button className="btn-outline-warning me-2 ms-2">
                  <i className="bi bi-bag-fill me-2"></i>My Purchases
                </button>
                <button
                  className="btn-outline-dark me-2"
                  onClick={handleUserSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
            {!user && (
              <div className="d">
                <Link to="/login" className="btn btn-outline-success">
                  Sign In
                </Link>
                <Link to="/register" className="btn btn-outline-primary">
                  Sign Up
                </Link>
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary position-relative"
              onClick={handleShowCart}
            >
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {totalItems}
                <span className="visually-hidden">Items in cart</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
