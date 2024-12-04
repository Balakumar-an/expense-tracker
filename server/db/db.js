const mongoose = require("mongoose");

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected successfully");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { db };
