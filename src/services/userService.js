const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    return user;
  } catch (error) {
    throw new Error('Could not create user');
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error('Could not find user');
  }
};

const findUserById = async (_id) => {
  try {
    const user = await User.findOne({ _id });
    return user;
  } catch (error) {
    throw new Error('Could not find user');
  }
};

const verifyPassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Could not verify password');
  }
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
};

const verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  verifyPassword,
  generateAuthToken,
  generateRefreshToken,
  verifyToken,
};
