import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/orders/place", { address });
      alert("Order placed!");
      navigate("/"); // Go back to home or order success page
    } catch (error) {
      alert("Error placing order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          Checkout
        </h2>
        <input
          name="fullName"
          placeholder="Full Name"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          name="phone"
          placeholder="Phone"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          name="street"
          placeholder="Street Address"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded transition">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
