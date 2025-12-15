import express from "express";
import { registerUser } from "../Controller/UserController.js";

const router = express.Router();

router.route("/register").post(registerUser);

export default router;
