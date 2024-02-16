const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/userModel");
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

/**Database connection starts */
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connection to MongoDB is established!");
  })
  .catch((err) => {
    console.log("something went wrong with DB connection", err);
  });
/**Database connection ends */

const SECRET_KEY = "my-name-is-Feecon";

const app = express();
app.use(cookieParser());
app.use(express.json());

//home route
app.get("/", (req, res) => {
  res.cookie("pageVisited", "home", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.json({ message: "Hello World" });
});

//product route
app.get("/product", (req, res) => {
  console.log("cookies", req.cookies);
  res.cookie("best-seller", "product", {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    path: "/product",
  });
  const { pageVisited } = req.cookies;
  if (pageVisited) {
    res.json({ message: "Welcome to Product page" });
  } else {
    res.json({ message: "You are visiting for the first time" });
  }
});

//clear cookie
app.get("/clearCookie", (req, res) => {
  res.clearCookie("pageVisited"), { path: "/" };
  res.json({ message: "Cookie cleared" });
});

//jwt token
app.get("/signin", async (req, res) => {
  const payLoad = 1234;
  try {
    jwt.sign(
      { data: payLoad },
      SECRET_KEY,
      { expiresIn: "1h" },
      function (err, data) {
        if (err) {
          throw new Error(err.message);
        }
        res.cookie("token", data, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({ message: data });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/verify", (req, res) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ message: decoded });
  } catch (err) {
    console.log(err);
  }
});

app.post("/signup", async (req, res) => {
  try {
    const userObject = req.body;
    console.log("userObject", userObject);
    const user = await User.create(userObject);
    console.log("user", user);
    res.status(201).json({
      status: 201,
      message: "user created successfully",
      data: user,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  //validate credentials
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    console.log("user", user);

    if (!user) {
      res.status(404).json({
        status: 404,
        message: "user not found",
      });
    } else {
      if (user.password === password) {
        const token = jwt.sign({ data: user._id }, SECRET_KEY);
        res.cookie("token", token, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });
        res.json({
          message: "user logged in successfully",
          data: user,
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "invalid credentials",
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
  //send token
});

const protectRoute = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.data);
    if (!user) {
      res.status(404).json({
        status: 404,
        message: "user not found",
      });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(401).json({
      status: 401,
      message: "invalid token",
    });
  }
};

app.get("/userData", protectRoute, async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "logged in user data",
      data: req.user,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "no user found",
    });
  }
});

app.get("/logout", (req, res) => { 
    res.clearCookie("token"), { path: "/" };
    res.json({ message: "user logged out" });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
