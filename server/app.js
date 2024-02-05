const express = require("express");
const mongoose = require("mongoose");
// const connectDB = require("./utils/db")
const {
  createUser,
  getUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
} = require("./controllers/userController");

const {
  getProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("./controllers/productController");

require("dotenv").config();
const PORT = process.env.PORT || 3300;
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

// connectDB();

const app = express();
app.use(express.json());

/**user routes */
app.get("/api/user", getUser);
app.post("/api/user", checkInput, createUser);
app.get("/api/user/:id", getUserById);
app.patch("/api/user/:id", updateUserById);
app.delete("/api/user/:id",deleteUserById);

/**product routes */
app.post("/api/product", createProduct);
app.get("/api/product", getProduct);
app.get("/api/product/:id", getProductById);
app.patch("/api/product/:id", updateProductById);
app.delete("/api/product/:id", deleteProductById);

//fallback middleware, i.e if no middleware works then the default middleware works
app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost/${PORT}`);
});
