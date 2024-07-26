import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/productDetails/ProductDetailsPage";
import LoginPage from "./pages/login/LoginPage";
import CartContainer from "./components/cartContainer/CartContainer";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="app">
      <Router>
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <CartContainer />
            <div className="pages">
              <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/products" element={<ProductsPage />}></Route>
                <Route
                  path="/product/:id"
                  element={<ProductDetailsPage />}
                ></Route>
              </Routes>
            </div>
          </CartProvider>
        </ProductsProvider>
      </Router>
    </div>
  );
}

export default App;
