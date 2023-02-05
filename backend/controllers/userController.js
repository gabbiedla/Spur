const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// create functions

//register user

//@desc Register a new user
//@Route /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  //desctuctire
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    // return res.status(400).json({ message: 'Please include all fields' });
    // insert error handling
    res.status(400);
    throw new Error('Please include all fields');
  }

  //FIND if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new error('Invalid user data');
  }

  // res.send('Register Route');
});

//@desc Login a user
//@Route /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // cgecj user & passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
  // res.send('Login Route');
});

//@desc get current user
//@Route /api/users/me
//@access Private
const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json(user);
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

//export
module.exports = {
  registerUser,
  loginUser,
  getMe,
};
