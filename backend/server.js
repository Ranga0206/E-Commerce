import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

dotenv.config({ path: "backend/Config/config.env" });
const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is Runing on http://localhost:${PORT}`);
});
