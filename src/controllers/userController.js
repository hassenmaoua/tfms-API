const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify the password
    const passwordMatch = await userService.verifyPassword(
      password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate an authentication token and a refresh token
    const token = userService.generateAuthToken(user);
    const refreshToken = userService.generateRefreshToken(user);

    return res
      .status(200)
      .json({ message: 'Login successful', token, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed : ' + error });
  }
};

const getUserByToken = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];

  try {
    // Verify the token
    const decoded = userService.verifyToken(token, process.env.JWT_SECRET);

    // Find the user by ID
    const user = await userService.findUserById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  register,
  login,
  getUserByToken,
};
