const User = require('../models/userModel')

const checkInput = function (req, res, next) {
  console.log("req method", req.method);
  const userDetails = req.body;
  const isEmpty = Object.keys(userDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
}

async function getUser(req, res) {
  try {
    const userData = await User.find();
    if (userData.length === 0) {
      throw new Error("User not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Data found",
        data: userData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function createUser(req, res) {
  try {
    console.log("request body", req.body);
    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length === 0;
    if (isEmpty) {
      res.status(400).json({
        status: 400,
        message: "Body cannot be empty",
      });
    } else {
      console.log("new user", userDetails);
      const user = await User.create(userDetails);
      res.status(201).json({
        status: 201,
        message: "User created Successfully!",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    console.log("userid", id);
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function updateUserById(req, res) {
  try {
    console.log("request params", req.params);
    const { id } = req.params;
    const updatedUserData = req.body;
    console.log("userid", id);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updatedUserData,
      {
        new: true,
      }
    );
    console.log("updated product", updatedUser);
    if (!updatedUser) {
      throw new Error("User not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "User updated successfully",
        data: updatedUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Product deleted successfully",
        data: deletedUser,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

module.exports = {
  getUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
};

