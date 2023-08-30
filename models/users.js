const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// require("colors");

const usersPath = path.join(__dirname, "users.json");
//! потім зробити файл з юзерами ві перенаправити туди

const listUsers = async () => {
  const data = await fs.readFile(usersPath);
  return JSON.parse(data);
};

const getUserById = async (userId) => {
  const users = await listUsers();
  const result = users.find((user) => user.id === userId);
  return result || null;
};

const removeUser = async (userId) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === userId);
  if (index === -1) {
    return null;
  }
  const [result] = users.splice(index, 1);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return result;
};

const addUser = async (body) => {
  const users = await listUsers();

  const newUser = {
    id: nanoid(),
    ...body,
  };
  users.push(newUser);
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));

  return newUser;
};

const updateUser = async (id, body) => {
  const users = await listUsers();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...body };
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
  return users[index];
};

module.exports = {
  listUsers,
  getUserById,
  removeUser,
  addUser,
  updateUser,
};
