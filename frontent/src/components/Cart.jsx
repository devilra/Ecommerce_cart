import React, { useEffect, useState } from "react";
import api from "../api";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, fetchCart, loading, removeCart, updateQuantity } = useCart();

  const clearCart = async () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear the entire cart?"
    );

    if (!confirmClear) return;

    try {
      await api.post("/cart/clear");
      fetchCart();
      alert("Cart empty Successfull");
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">
        Your Cart
      </h2>
      <hr />
      {cart.items.length > 0 && (
        <div className=" mb-8 flex items-center justify-end">
          <button
            onClick={clearCart}
            className="bg-red-600 my-5 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">
            Clear cart
          </button>
          <Link
            to="/checkout"
            className=" text-center px-3 mx-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded">
            Proceed to Checkout
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cart.items.length === 0 ? (
          <p className="col-span-full text-center mt-20 font-semibold text-3xl text-gray-500">
            Cart is empty.
          </p>
        ) : (
          cart.items.map((item) => (
            <div
              key={item.product._id}
              className="bg-white p-6 rounded-xl shadow-md">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="h-20 rounded-md object-cover shadow-md"
              />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                {item.product.name}
              </h4>
              <p className="text-gray-600 mb-4">Quantity: {item.quantity}</p>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => {
                    updateQuantity(item.product._id, item.quantity + 1);
                  }}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                  +
                </button>
                <button
                  onClick={() => {
                    updateQuantity(item.product._id, item.quantity - 1);
                  }}
                  disabled={item.quantity <= 1}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                  -
                </button>
                <button
                  onClick={() => removeCart(item.product._id)}
                  className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
