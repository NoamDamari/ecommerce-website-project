import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./pages/home/HomePage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailsPage from "./pages/productDetails/ProductDetailsPage";
import LoginPage from "./pages/login/LoginPage";
import { ProductsProvider } from "./context/productsContext";

function App() {
  return (
    <div className="app">
      <Router>
        <ProductsProvider>
          <Navbar />
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
        </ProductsProvider>
      </Router>
    </div>
  );
}

export default App;
