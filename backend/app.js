import express from "express";
import product from "./routes/ProductRoutes.js";
import user from "./routes/UserRoutes.js";
import errorHandler from "./middleware/error.js";

const app = express();

app.use(express.json());
//Routes
app.use("/api/v1/", product); //ProductRoute
app.use("/api/v1/", user); //UserRoute

app.use(errorHandler);

export default app;
