import HandleError from "./handleError.js";
import JWT from "jsonwebtoken";
import User from "../models/UserModel.js";

//verfiyUser
export const verfiyUser = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new HandleError("Access denined please login to access", 401));
  }
  const decodedData = JWT.verify(token, process.env.JWT_SECRET_KEY);
  //console.log(decodedData);
  req.user = await User.findById(decodedData.id);
  // console.log(req.user);
  next();
};

//Role base Login

//["admin","superAdmin"]
//["User"]

export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role - ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
