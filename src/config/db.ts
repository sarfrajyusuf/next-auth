

import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URL!);
    console.log("connected with server");
  } catch (error: any) {
    console.log(error.message);
  }
}

export default connectDB;
