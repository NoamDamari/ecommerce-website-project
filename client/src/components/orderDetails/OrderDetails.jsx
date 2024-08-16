import React, { useState } from "react";

const OrderDetails = ({ order }) => {
  const [showAllItems, setShowAllItems] = useState(false);

  const handleToggleItems = () => {
    setShowAllItems(!showAllItems);
  };

  const itemsToShow = showAllItems ? order.items : order.items.slice(0, 2);
  return (
    <div className="order-details-wrapper mx-auto">
      <div className="order-details card my-3">
        <h5 className="card-header text-center">
          {new Date(order.date).toLocaleDateString()}
        </h5>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th style={{ width: "60%" }}>Item</th>
                <th style={{ width: "20%" }}>Price</th>
                <th style={{ width: "20%" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {itemsToShow.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-right">
            <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <div>
            {order.items.length > 2 && (
              <button onClick={handleToggleItems} className="btn btn-dark">
                {showAllItems ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
