import express from "express";
import {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  viewProductReviews,
  getAllProductsByAdmin,
  adminDeleteReview,
} from "../Controller/ProductController.js";
import { roleBasedAccess, verfiyUser } from "../helper/UserAuth.js";

const router = express.Router();

//User
router.route("/products").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/review").put(verfiyUser, createProductReview);

//Admin
router
  .route("/admin/product/create")
  .post(verfiyUser, roleBasedAccess("admin"), addProduct);
router
  .route("/admin/product/product/:id")
  .put(verfiyUser, roleBasedAccess("admin"), updateProduct)
  .delete(verfiyUser, roleBasedAccess("admin"), deleteProduct);

router
  .route("/admin/products")
  .get(verfiyUser, roleBasedAccess("admin"), getAllProductsByAdmin);
router
  .route("/admin/reviews")
  .get(verfiyUser, roleBasedAccess("admin"), viewProductReviews)
  .delete(verfiyUser, roleBasedAccess("admin"), adminDeleteReview);
//Delete Review

export default router;
