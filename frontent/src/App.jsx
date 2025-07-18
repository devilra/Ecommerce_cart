import React, { useEffect, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Cart from "./components/Cart";
import api from "./api";
import Checkout from "./components/Checkout";
import useCart from "./hooks/useCart";
import OrderHistory from "./components/OrderHistory";
import AdminOrders from "./components/AdminOrders";
import Register from "./components/Register";

const App = () => {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // for skeleton loading
  const { cart } = useCart();

  const getUser = async () => {
    try {
      const res = await api.get("/auth/me");
      //console.log(res.data);
      setUser(res.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Not logged in, so just ignore or clear user
        setUser(null);
      } else {
        console.error("Error fetching user:", error);
      }
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      alert("Logged out");
    } catch (error) {
      alert("Error logging out");
    }
  };
  const location = useLocation();

  const showNavbar = ["/login"].includes(location.pathname);

  return (
    <>
      {!showNavbar && !loadingUser && user && (
        <nav className="bg-purple-700 text-white px-6 py-4 shadow-md relative">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-white">
              🍯 HoneyShop
            </Link>

            {/* Mobile menu button */}
            <button
              className="sm:hidden focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop nav links */}
            <div className="hidden sm:flex gap-4 items-center">
              {user.isAdmin && (
                <Link
                  to="/admin/orders"
                  className="hover:bg-purple-500 tracking-[1px] text-[14px] text-white font-mono font-bold bg-purple-800  px-3 py-2 rounded">
                  Admin
                </Link>
              )}

              <Link to="/" className="hover:bg-purple-800 px-3 py-2 rounded">
                Products
              </Link>
              <Link
                to="/cart"
                className="hover:bg-purple-800 px-3 py-2 rounded">
                Cart
              </Link>
              <Link
                to="/orders"
                className="hover:bg-purple-800 px-3 py-2 rounded">
                Orders
              </Link>
              {loadingUser ? (
                <div className="animate-pulse bg-purple-600 rounded px-3 py-2 w-24 h-8"></div>
              ) : !user ? (
                <>
                  <Link
                    to="/login"
                    className="hover:bg-purple-800 px-3 py-2 rounded">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <span className="px-3 py-2">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile nav links dropdown */}
          {isOpen && (
            <div className="sm:hidden mt-2 bg-purple-600 rounded-lg shadow-md absolute w-full left-0 z-50 px-6 py-4 space-y-2">
              <Link
                to="/"
                className="block hover:bg-purple-700 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}>
                Products
              </Link>
              <Link
                to="/cart"
                className="block hover:bg-purple-700 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}>
                Cart
              </Link>
              <Link
                to="/orders"
                className="block hover:bg-purple-700 px-3 py-2 rounded"
                onClick={() => setIsOpen(false)}>
                Orders
              </Link>

              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block hover:bg-purple-700 px-3 py-2 rounded"
                    onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <span className="block px-3 py-2">Hi, {user.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded">
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </nav>
      )}

      {loadingUser ? (
        <div className="flex justify-center mt-20 ">loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={user ? <ProductList /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={<Login onLogin={setUser} getUser={getUser} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/cart"
            element={user ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={
              user ? (
                cart.items.length > 0 ? (
                  <Checkout />
                ) : (
                  <Navigate to="/cart" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/orders"
            element={user ? <OrderHistory /> : <Navigate to="/login" />}
          />

          <Route
            path="/admin/orders"
            element={
              user ? (
                user?.isAdmin ? (
                  <AdminOrders />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      )}
    </>
  );
};

export default App;
