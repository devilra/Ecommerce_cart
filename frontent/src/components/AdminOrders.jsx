import React, { useEffect, useState } from "react";
import api from "../api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [updateClicked, setUpdateClicked] = useState({});

  //console.log("selectedStatuses :", selectedStatuses);
  //console.log("updateClicked :", updateClicked);

  console.log(orders);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders/admin/all");
      setOrders(res.data);
      //console.log(res.data);
      setLoading(false);
    } catch (error) {
      alert("Access Denied or Login required");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));

    setUpdateClicked((prev) => ({
      ...prev,
      [orderId]: false,
    }));
  };

  const updateStatus = async (id, status) => {
    await api.put(`/orders/admin/${id}`, { status });
    fetchOrders();
    setUpdateClicked((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        📦 Admin Orders
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orders.map((order) => {
          const currentStatus = order.status;
          const selected = selectedStatuses[order._id] || currentStatus;
          const isDelevered = currentStatus === "Delivered";
          const disableUpdate =
            selected === currentStatus || updateClicked[order._id];

          console.log(disableUpdate);

          //console.log(isDelevered);

          return (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>User:</strong> {order.user.name} ({order.user.email})
                </p>
                <p>
                  <strong>Status:</strong>
                  <strong className="text-blue-600 font-semibold">
                    {order.status}
                  </strong>
                </p>
                {!isDelevered && (
                  <>
                    <select
                      value={selected}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="mt-2 block w-full border rounded px-3 py-1 bg-gray-50 text-gray-800 shadow-sm">
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      disabled={disableUpdate}
                      onClick={() => updateStatus(order._id, selected)}
                      className={`mt-2 px-4 py-2 rounded ${
                        disableUpdate
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-700 hover:bg-purple-800"
                      } text-white font-semibold transition`}>
                      Update
                    </button>
                  </>
                )}
              </div>
              <div>
                <p className="font-semibold mb-1">🛒 Items:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {order.items.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminOrders;
