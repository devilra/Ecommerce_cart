const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
