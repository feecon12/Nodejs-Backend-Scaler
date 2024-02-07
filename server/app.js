const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");

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

const app = express();
app.use(express.json());

/**router*/
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/search", (req, res) => {
  console.log(req.query);
  res.status(200).json({
    message: "Search successfull!",
    data: req.query,
  });
});

//fallback middleware, i.e if no middleware works then the default middleware works
app.use(function (req, res) {
  res.status(404).send("404 Not Found");
});

//start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost/${PORT}`);
});
