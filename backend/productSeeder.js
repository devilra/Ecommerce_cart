const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/Product");

const products = [
  {
    name: "Honey Bottle",
    price: 250,
    image:
      "https://media.istockphoto.com/id/520733611/photo/jar-of-honey-with-honeycomb.jpg?s=612x612&w=0&k=20&c=k7s6XnJvM1O3kLfy5XUn1M169j11Zcca9rFgvIBGkUE=",
    description: "Pure homemade honey",
    stock: 100,
  },
  {
    name: "Honey Athi",
    price: 350,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8z-3y7N_28tCZRFljebuJ9mmrCWhxPoiwgA&s",
    description: "Ayurvedic honey athi",
    stock: 50,
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

const seedProducts = async () => {
  try {
    connectDB();
    await Product.deleteMany();
    console.log("Product Deleted Successfully");
    await Product.insertMany(products);
    console.log("Products Seeded");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
