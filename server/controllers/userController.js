const User = require("../models/userModel");
const {emailBuilder} = require("../nodemailer");
const {
  createFactory,
  getFactory,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
  checkInput,
  searchFactoryByParams,
} = require("../utils/crudFactory");

//handlers
const getUsers = getFactory(User);
const createUser = createFactory(User);
const getUserById = getFactoryById(User);
const updateUserById = updateFactoryById(User);
const deleteUserById = deleteFactoryById(User);
const searchUserByParams = searchFactoryByParams(User);

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const forgetPassword = async (req, res) => {
  //user sends their email
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    console.log("user ", user);
    //verify that email exists in database
    if (!user) {
      res.status(404).json({
        status: "fail!",
        message: "User not found",
      });
    } else {
      //generate a token
      const token = otpGenerator();
      user.token = token.toString();
      user.otpExpiry = new Date(Date.now() + 1000 * 60 * 5);
      await user.save();
      //send email with link to reset password
      emailBuilder(user.email, "Reset Password", `Your OTP is ${token}`)
        .then(() => {
          console.log("Reset email is sent successfully");
        })
        .catch((err) => {
          console.log("Error in sending email", err);
        });
      res.status(200).json({
        status: "success",
        message: "OTP is sent to your email",
      });
    }
  } catch (error) {
    console.log("Error in forget password", error);
    res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  //user send token and the new password
  //verify that token is valid
  //update the user's password
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
  searchUserByParams,
  forgetPassword,
  resetPassword,
};
