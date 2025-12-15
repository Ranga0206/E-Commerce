import HandleError from "../helper/handleError.js";
import { sendToken } from "../helper/JwtToken.js";
import User from "../models/UserModel.js";

//User  Creation
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

  /*
  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
  */
  sendToken(user, 201, res);
};

//Login User

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError("Email or Password cannot be empty", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new HandleError("Invaild Email Id or Password", 401));
  }
  const isValidPassword = await user.verifyPassword(password);

  if (!isValidPassword) {
    return next(new HandleError("Invaild Email Id or Password", 401));
  }

  sendToken(user, 200, res);

  // res.json({ success: true, user });
};

//Logout
export const logOut = async (req, res, next) => {
  const options = { expires: new Date(Date.now()), httpOnly: true };
  res.cookie("token", null, options);
  res.status(200).json({ success: true, meassage: "Successfully logged Out" });
};
