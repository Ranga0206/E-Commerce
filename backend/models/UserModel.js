import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your name"],
      maxLength: [
        25,
        "Invalid name. Please enter a name with fewer than 25 characters",
      ],
      minLength: [3, "Name should contain more than 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password Should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = bcryptjs.hashSync(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.verifyPassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

export default mongoose.model("User", userSchema);
