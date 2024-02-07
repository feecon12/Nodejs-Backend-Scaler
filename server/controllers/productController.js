const Product = require("../models/productModel")
const {
  createFactory,
  getFactory,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
  checkInput,
} = require("../utils/crudFactory");

const getProducts = getFactory(Product);
const createProduct = createFactory(Product);
const getProductById = getFactoryById(Product);
const updateProductById = updateFactoryById(Product);
const deleteProductById = deleteFactoryById(Product); 

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  checkInput,
};
