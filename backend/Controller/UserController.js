import HandleError from "../helper/handleError.js";
import User from "../models/UserModel.js";
export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return next(new HandleError("Name cannot be empty", 400));
  }
  if (!email) {
    return next(new HandleError("Email Address cannot be empty", 400));
  }
  if (!password) {
    return next(new HandleError("Password cannot be empty", 400));
  }

  // console.log(name, email, password);

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "temp_id",
      url: "temp_url",
    },
  });

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
};
