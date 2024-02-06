const User = require('../models/userModel');
const {
  createFactory,
  getFactory,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
  checkInput
} = require('../utils/crudFactory');

const getUser = getFactory(User);
const createUser = createFactory(User);
const getUserById = getFactoryById(User);
const updateUserById = updateFactoryById(User);
const deleteUserById = deleteFactoryById(User); 

module.exports = {
  getUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
};

