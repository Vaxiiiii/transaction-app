const bcrypt = require('bcrypt');
const User = require('../models/user');

const loginUser = async (username, password) => {
  const user = await User.findOne({ where: { username } });
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
};

const createUser = async (userData) => {
  userData.password = await bcrypt.hash(userData.password, 10);
  return await User.create(userData);
};

module.exports = { loginUser, createUser };