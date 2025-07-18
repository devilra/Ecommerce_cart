const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      fullName: String,
      phone: String,
      street: String,
      city: String,
      pincode: String,
    },
    totalPrice: Number,
    status: { type: String, default: "Processing" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
