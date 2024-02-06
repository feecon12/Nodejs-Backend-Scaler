const Product = require("../models/productModel")
const {
  createFactory,
  getFactory,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
  checkInput,
} = require("../utils/crudFactory");

const getProduct = getFactory(Product);
const createProduct = createFactory(Product);
const getProductById = getFactoryById(Product);
const updateProductById = updateFactoryById(Product);
const deleteProductById = deleteFactoryById(Product); 

module.exports = {
  getProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  checkInput,
};
