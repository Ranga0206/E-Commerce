import HandleError from "./handleError.js";
import JWT from "jsonwebtoken";
import User from "../models/UserModel.js";
export const verfiyUser = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return next(new HandleError("Access denined please login to access", 401));
  }
  const decodedData = JWT.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  console.log(req.user);
  next();
};
