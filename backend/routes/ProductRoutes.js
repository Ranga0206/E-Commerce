import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/ProductController.js";
import { roleBasedAccess, verfiyUser } from "../helper/UserAuth.js";

const router = express.Router();
router
  .route("/products")
  .get(verfiyUser, getAllProducts)
  .post(verfiyUser, roleBasedAccess("admin"), addProduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(verfiyUser, roleBasedAccess("admin"), updateProduct)
  .delete(verfiyUser, roleBasedAccess("admin"), deleteProduct);

export default router;
