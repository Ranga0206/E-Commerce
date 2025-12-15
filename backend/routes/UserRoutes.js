import express from "express";
import {
  loginUser,
  logOut,
  registerUser,
} from "../Controller/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOut);

export default router;
