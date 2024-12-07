const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

class MongoDB {
  async init() {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("Connected to mongoDB");
    } catch (err) {
      console.error("could not connect to mongoDB");
      process.exit(1);
    }
  }
}

module.exports = MongoDB;
