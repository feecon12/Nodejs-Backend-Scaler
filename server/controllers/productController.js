const Product = require("../models/productModel")

const checkInput = function (req, res, next) {
  console.log("req method", req.method);
  const productDetails = req.body;
  const isEmpty = Object.keys(productDetails).length === 0;
  if (isEmpty) {
    res.status(400).json({
      status: 400,
      message: "Body cannot be empty",
    });
  } else {
    next();
  }
};

async function createProduct(req, res) {
  try {
    console.log("request body", req.body);
    const productDetails = req.body;
    const isEmpty = Object.keys(productDetails).length === 0;
    if (isEmpty) {
      res.status(400).json({
        status: 400,
        message: "Body cannot be empty",
      });
    } else {
      console.log("new product", productDetails);
      const product = await Product.create(productDetails);
      res.status(201).json({
        status: 201,
        message: "Product created Successfully!",
        data: product,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
}

async function getProduct(req, res) {
  try {
    const productData = await Product.find();
    if (productData.length === 0) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Data found",
        data: productData,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    console.log("productid", id);
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    res.status(200).json({
      status: 200,
      message: "Product found",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function updateProductById(req, res) {
  try {
    console.log("request params", req.params);
    const { id } = req.params;
    const updatedProductData = req.body;
    console.log("productid", id);
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedProductData,
      {
        new: true,
      }
    );
    console.log("updated product", updatedProduct);
    if (!updatedProduct) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: err.message,
    });
  }
}

async function deleteProductById(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      throw new Error("Product not found");
    } else {
      res.status(200).json({
        status: 200,
        message: "Product deleted successfully",
        data: deletedProduct,
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
  createProduct,
  getProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  checkInput,
};
