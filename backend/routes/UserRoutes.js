import express from "express";
import {
  loginUser,
  logOut,
  registerUser,
  forgetPassword,
  resetPassword,
} from "../Controller/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);
router.route("/password/forget").post(forgetPassword);
router.route("/reset/:token").post(resetPassword);
export default router;
