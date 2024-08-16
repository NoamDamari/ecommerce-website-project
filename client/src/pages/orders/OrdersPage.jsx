import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import OrderDetails from "../../components/orderDetails/OrderDetails.jsx";
import { useOrders } from "../../hooks/useOrders.js";

const OrdersPage = () => {
  const { userOrders } = useContext(UserContext);
  useOrders();

  return (
    <div className="container">
      <div className="row">
        {userOrders.map((order) => (
          <div className="col-12" key={order._id}>
            <OrderDetails order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
