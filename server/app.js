const express = require("express");
const fs = require("fs");
const short = require("short-uuid");
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

const User = mongoose.model("User", userSchema);

const app = express();
const data = fs.readFileSync("./data.json", "utf8");
const userData = JSON.parse(data);

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

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
      msg = 'Data found'
      res.json({
        status: 200,
        message: msg,
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
      userData.push(userDetails);
      const user = await User.create(userDetails);
      res.status(201).json({
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
    res.json({
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

app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
