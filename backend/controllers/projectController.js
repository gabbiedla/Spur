const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Project = require('../models/projectModel');

//@desc get user projects
//@Route GET /api/projects
//@access Private
const getProjects = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json({ message: 'getProjects' });
});

//@desc Creat new project
//@Route POST /api/projects
//@access Private
const createProject = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
  };
  res.status(200).json({ message: 'createProject' });
});

module.exports = {
  getProjects,
  createProject,
};
