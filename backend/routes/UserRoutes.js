import express from "express";
import { verfiyUser } from "../helper/UserAuth.js";
import {
  loginUser,
  logOut,
  registerUser,
  forgetPassword,
  resetPassword,
  profile,
  updatePassword,
  updateProfile,
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

export default router;
