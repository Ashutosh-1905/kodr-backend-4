const mongoose = require("mongoose");
require("dotenv").config();

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected succesfully.");
  } catch (err) {
    console.log("Data base connection error :", err);
    process.exit(1);
  }
};

module.exports = connectToDb;
