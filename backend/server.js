import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

dotenv.config({ path: "backend/Config/config.env" });
const PORT = process.env.PORT || 3000;
connectDB();

const server = app.listen(PORT, () => {
  console.log(`Server is Runing on http://localhost:${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down,due to uncaught Exception`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down,due to unhandled rejection`);
  server.close(() => {
    process.exit(1);
  });
});
