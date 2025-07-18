import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import useCart from "../hooks/useCart";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    cart,
    fetchCart,
    getQuantity,
    loading: cartLoading,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => alert("Failed to Products"));
  }, []);

  useEffect(() => {
    fetchCart();
  }, []);

  const addtoCart = async (id) => {
    try {
      await api.post(`/cart/add`, { productId: id, quantity: 1 });
      alert("Added to cart");
      navigate("/cart");
    } catch (error) {
      alert("Login first or error");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Our Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => {
          const quantity = getQuantity(p._id);
          return (
            <div
              key={p._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src={p.image}
                alt={p.name}
                className="h-40 object-cover w-full"
              />
              <h4 className="text-xl font-semibold mb-2 text-gray-800">
                {p.name}
              </h4>
              <p className="text-gray-600 mb-4">{p.description}</p>
              {cartLoading ? (
                <div className="flex items-center gap-4">
                  <div className="h-8 w-full bg-gray-300 animate-pulse rounded"></div>
                  {/* <div className="h-6 w-6 bg-gray-300 animate-pulse rounded"></div>
                  <div className="h-8 w-8 bg-gray-300 animate-pulse rounded"></div> */}
                </div>
              ) : quantity > 0 ? (
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateQuantity(p._id, quantity - 1)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                    -
                  </button>
                  <span className="text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(p._id, quantity + 1)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addtoCart(p._id)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
