const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected ✅ : ${connection.connection.host}`);
    console.log(`Database 📁 : ${connection.connection.name}`);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
