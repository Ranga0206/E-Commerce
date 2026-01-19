import express from "express";
import { roleBasedAccess, verfiyUser } from "../helper/UserAuth.js";
import {
  createNewOrder,
  getAllOrders,
  getOrderDetails,
  getAllOrdersByAdmin,
  deleteOrder,
} from "../Controller/OrderController.js";
const router = express.Router();

router.route("/new/order").post(verfiyUser, createNewOrder);
router.route("/order/:id").get(verfiyUser, getOrderDetails);
router.route("/orders/user").get(verfiyUser, getAllOrders);

//admin
router
  .route("/admin/orders")
  .get(verfiyUser, roleBasedAccess("admin"), getAllOrdersByAdmin);

router
  .route("/admin/order/:id")
  .delete(verfiyUser, roleBasedAccess("admin"), deleteOrder);
export default router;
