import React, { useEffect, useState } from "react";
import api from "../api";
import useCart from "../hooks/useCart";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/my-orders");
      console.log(res.data);
      setOrders(res.data);
      setLoading(false);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">
        🧾 Your Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">No orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg my-2 p-6 border border-gray-200">
              <div className="mb-4">
                <p className="text-sm text-gray-500">
                  <strong>Order ID:</strong> {order._id}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date:</strong>
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mb-4">
                <p className="font-medium">
                  <strong className="px-2">Status:</strong>
                  <span className="text-green-300 px-2 border border-green-700 text-[14px] rounded py-1">
                    {order.status}
                  </span>
                </p>
                <p className="font-medium">
                  <strong className="px-2">Total:</strong>
                  <span className="text-neutral-600  text-[14px] rounded-md py-1">
                    {order.totalPrice}
                  </span>
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Items:</p>
                <ul className="list-disc list-inside text-gray-700">
                  {order.items.map((item) => (
                    <li
                      key={item.product._id}
                      className="text-[14px] font-mono">
                      {item.product.name} × {item.quantity}{" "}
                    </li>
                  ))}
                </ul>
              </div>

              {/* <p className="text-sm text-gray-600">
                <strong>Delivery Address:</strong> {order.address.street},{" "}
                {order.address.city} - {order.address.pincode}
              </p> */}

              {order.address ? (
                <p className="text-sm text-gray-600">
                  <strong>Delivery Address:</strong> {order.address.street},{" "}
                  {order.address.city} - {order.address.pincode}
                </p>
              ) : (
                <p className="text-sm text-red-500">No address found</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
