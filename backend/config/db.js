const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB Connected Successfully");
    console.log("MongoDB Ready State:", mongoose.connection.readyState);
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    console.error("ERROR NAME:", error.name);
    process.exit(1);
  }
};

module.exports = connectDB;