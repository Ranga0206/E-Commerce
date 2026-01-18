import express from "express";
import product from "./routes/ProductRoutes.js";
import user from "./routes/UserRoutes.js";
import order from "./routes/OrderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
//Routes
app.use("/api/v1/", product); //ProductRoute
app.use("/api/v1/", user); //UserRoute
app.use("/api/v1/", order);

app.use(errorHandler);

export default app;
