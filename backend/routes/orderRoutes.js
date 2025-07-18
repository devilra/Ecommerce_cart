const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderSatus,
} = require("../controllers/orderController");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/place", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);

//admin

router.get("/admin/all", protect, admin, getAllOrders);
router.put("/admin/:id", protect, admin, updateOrderSatus);

module.exports = router;
