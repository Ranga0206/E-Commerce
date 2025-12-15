import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../Controller/ProductController.js";
import { verfiyUser } from "../helper/UserAuth.js";

const router = express.Router();
router.route("/products").get(verfiyUser, getAllProducts).post(addProduct);
router
  .route("/product/:id")
  .get(getSingleProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
