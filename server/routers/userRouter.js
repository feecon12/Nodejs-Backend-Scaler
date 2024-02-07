const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
  searchUserByParams,
} = require("../controllers/userController");

userRouter.get("/", searchUserByParams);
userRouter.get("/", getUsers);
userRouter.post("/", createUser);
userRouter.get("/:id", getUserById);
userRouter.patch("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
