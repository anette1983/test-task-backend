const usersOperations = require("../../models/users");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAllUsers = async (req, res, next) => {
  const users = await usersOperations.listUsers();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result: users,
    },
  });
};

const getById = async (req, res, next) => {
  const { id } = req.params;

  const result = await usersOperations.getUserById(id);

  if (!result) {
    throw HttpError(404, `User with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const addUser = async (req, res, next) => {
  const result = await usersOperations.addUser(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    message: "User added successfully",
    data: {
      result,
    },
  });
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const result = await usersOperations.updateUser(id, req.body);
  if (!result) {
    throw HttpError(404, `User with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "User updated successfully",
    data: {
      result,
    },
  });
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const result = await usersOperations.removeUser(id);
  if (!result) {
    throw HttpError(404, `User with id = ${id} not found`);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    message: "User deleted successfully",
  });
};

module.exports = {
  getAllUsers: ctrlWrapper(getAllUsers),
  getById: ctrlWrapper(getById),
  addUser: ctrlWrapper(addUser),
  updateUser: ctrlWrapper(updateUser),
  deleteUser: ctrlWrapper(deleteUser),
};
