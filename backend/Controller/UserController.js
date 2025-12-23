import HandleError from "../helper/handleError.js";
import { sendToken } from "../helper/JwtToken.js";
import { sendEmail } from "../helper/sendEmail.js";
import User from "../models/UserModel.js";
import crypto from "crypto";

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

//Reset password and sample meassage
export const forgetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("User does not exists", 400));
  }

  let resetToken;
  try {
    resetToken = user.createPasswordResetToken();
    await user.save();
    //console.log(resetToken);
  } catch (error) {
    return next(
      new HandleError("Could not save reset token,Try again later..", 500)
    );
  }
  const resetPasswordUrl = `${req.protocol}://${req.host}/reset/${resetToken}`;
  const message = `Reset your password using the link below:\n${resetPasswordUrl}\n\nThe link expires in 30 minutes.\nIf this wasn't you, please ignore this meassage.`;
  const messageHTML = `<div
  style="
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f4f4f4;
  "
>
  <div
    style="
      max-width: 500px;
      margin: auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
    "
  >
    <h2 style="color: #333">Password Reset Request</h2>
    <p>Hello,</p>
    <p>
      You requested to reset your Password. click the button below to continue .
    </p>
    <a
      href="${resetPasswordUrl}"
      style="
        display: inline-block;
        padding: 12px 20px;
        background-color: #007bff;
        color: #ffff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 10px;
      "
    >
      Reset Password
    </a>
    <p style="margin-top: 20px">
      or copy and paste this link in your browser:<br />
      <a href="${resetPasswordUrl}">${resetPasswordUrl}</a>
    </p>

    <p style="color: red; font-weight: bold">
      This link will expire in 30 minutes.
    </p>
    <p>If you didn't request a password reset, please ignore this email.</p>
    <br />
    <p>Regards,<br />Your Website Team</p>
  </div>
</div>`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message,
      htmlMessage: messageHTML,
    });
    res.status(200).json({
      success: true,
      message: `Email is send to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new HandleError("Email could not be send try again later..", 500)
    );
  }
};

export const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new HandleError("Invaild or reset code expired", 400));
  }
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return next(
      new HandleError("Password doesn't match please both password", 400)
    );
  }
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};
