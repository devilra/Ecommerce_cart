import { useState, useEffect } from "react";
import api from "../api";

const useCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const res = await api.get("/cart");
    //console.log("cart: ", res.data);
    setCart(res.data);
    setLoading(false);
    //console.log(cart.items);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeCart = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this item?"
    );

    if (!confirmDelete) return;

    await api.post("/cart/remove", { productId: id });
    alert("Product Removed");
    fetchCart();
  };

  const updateQuantity = async (id, qty) => {
    if (qty < 1) return;
    await api.post("/cart/update", { productId: id, quantity: qty });
    fetchCart();
  };
  const getQuantity = (productId) => {
    const item = cart.items.find((i) => i.product._id === productId);
    return item ? item.quantity : 0;
  };

  return {
    cart,
    loading,
    fetchCart,
    removeCart,
    updateQuantity,
    getQuantity,
  };
};

export default useCart;
