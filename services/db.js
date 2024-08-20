const mongoose = require("mongoose");

const connectDB = async function () {
  const mongo_uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.error("could not connect to mongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;