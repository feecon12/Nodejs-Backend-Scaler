const User = require('../models/userModel');
const {
  createFactory,
  getFactory,
  getFactoryById,
  updateFactoryById,
  deleteFactoryById,
  checkInput,
  searchFactoryByParams
} = require('../utils/crudFactory');

const getUsers = getFactory(User);
const createUser = createFactory(User);
const getUserById = getFactoryById(User);
const updateUserById = updateFactoryById(User);
const deleteUserById = deleteFactoryById(User); 
const searchUserByParams = searchFactoryByParams(User);

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  checkInput,
  searchUserByParams,
};

