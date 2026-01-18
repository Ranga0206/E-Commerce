import express from "express";
import { verfiyUser, roleBasedAccess } from "../helper/UserAuth.js";
import {
  loginUser,
  logOut,
  registerUser,
  forgetPassword,
  resetPassword,
  profile,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/profile").get(verfiyUser, profile);
router.route("/password/update").put(verfiyUser, updatePassword);
router.route("/profile/update").put(verfiyUser, updateProfile);

//Admin routes
router
  .route("/admin/users")
  .get(verfiyUser, roleBasedAccess("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .get(verfiyUser, roleBasedAccess("admin"), getSingleUser)
  .put(verfiyUser, roleBasedAccess("admin"), updateUserRole)
  .delete(verfiyUser, roleBasedAccess("admin"), deleteUser);

export default router;
