const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendWelcomeEmail } = require('../services/emailService');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

const signup = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;

    if (!email || !password || !passwordConfirm) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const user = new User({ email, password });
    await user.save();

    await sendWelcomeEmail(email);

    const token = generateToken(user._id);
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { id: user._id, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email or password is incorrect' });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({ message: 'Email or password is incorrect' });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: { id: user._id, email: user.email, handle: user.handle }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
