import express from "express";
import { verfiyUser } from "../helper/UserAuth.js";
import { createNewOrder } from "../Controller/OrderController.js";
const router = express.Router();

router.route("/new/order").post(verfiyUser, createNewOrder);

export default router;
