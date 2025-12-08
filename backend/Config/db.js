import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log("MongoDB Connected With Server : ", data.connection.host);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default connectDB;
