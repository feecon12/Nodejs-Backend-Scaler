const express = require("express");
const fs = require("fs");
// const short = require("short-uuid");
const mongoose = require("mongoose");
// const dotenv = require('dotenv')
// dotenv.config()
require("dotenv").config(); // to read .env file and make them available in process.env
console.log(process.env.PORT);
const PORT = process.env.PORT || 3300;

/**Database connection starts */
mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("DB is connected!");
  })
  .catch((err) => {
    console.log("something went wrong with DB connection", err);
  });

/**Database connection ends */

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
    validate: function () {
      return this.password === this.confirmPassword;
    },
    message: "Password and confirmed password should be same",
  },
  createdAt: Date,
  id: String,
});

//User model creation
const User = mongoose.model("User", userSchema);

//app will hold all the properties and power of express framework
const app = express();

//middleware to make the express req/res body as json()
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} request to ${req.path}`);
//   next();
// });

/**Routes */
app.get("/api/user", getUserHandler);
app.post("/api/user", createUserHandler);
app.get("/api/user/:id", getUserById);

/**route handlers */
async function getUserHandler(req, res) {
  try {
    const userData = await User.find()
    if (userData.length === 0) {
      throw new Error('User not found')
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

async function createUserHandler(req, res) {
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
        status:201,
        message: "User created Successfully!",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message:error.message,
    })
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;
    console.log("userid", id);
    // const user = userData.find((user) => user.id === id);
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

/**end of route handlers */

//fallback middleware, i.e if no middleware works then the default middleware works
app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
