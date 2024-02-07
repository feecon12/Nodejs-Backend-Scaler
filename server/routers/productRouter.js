const express = require("express");
const productRouter = express.Router();
const Product = require("../models/productModel");

const {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  searchByParams,
} = require("../controllers/productController");

//routes for products
productRouter.get("/", searchByParams);
productRouter.get("/", getProducts);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProductById);
productRouter.delete("/:id", deleteProductById);

// async function searchByParams(req, res) {
//   try {
//     const sortQuery = req.query.sort;
//     const selectQuery = req.query.select;

//     //sorting logic
//     let queryResPromise = Product.find();
//     if (sortQuery) {
//       const [sortParam, order] = sortQuery.split(" ");
//       console.log("sort param ->", sortParam);
//       console.log("order ->", order);

//       if (order === "asc") {
//         console.log("order is", order);
//         queryResPromise = queryResPromise.sort(sortParam);
//       } else {
//         queryResPromise = queryResPromise.sort(`-${sortParam}`);
//       }
//     }

//     const result = await queryResPromise;

//     res.status(200).json({
//       message: "Search successfull!",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "internal server error",
//       error: err.message,
//     });
//   }
// }

module.exports = productRouter;
