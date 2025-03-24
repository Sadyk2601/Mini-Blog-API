const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((log) => {
        console.log("Connected to MongoDb");
      });
  } catch (error) {
    console.log("MongoDb connection failed");
  }
};
module.exports = connectDb;
