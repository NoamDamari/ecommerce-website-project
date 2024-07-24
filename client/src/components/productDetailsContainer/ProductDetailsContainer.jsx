import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductDetailsContainer.css";
import { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";

const ProductDetailsContainer = () => {
  const { selectedProduct } = useContext(ProductsContext);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container product-detailes-container">
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={selectedProduct.images[0]}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title product-title">
                {selectedProduct.title}
              </h3>
              <strong>Decription</strong>
              <p className="card-text product-description">
                {selectedProduct.description}
              </p>
              <strong>Brand</strong>
              <p className="card-text product-description">
                {selectedProduct.brand}
              </p>
              <p className="card-text">
              <strong>Total price</strong>
                <small className="text-body-secondary">
                  {selectedProduct.price}
                </small>
              </p>
              <button className="btn btn-dark"> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
