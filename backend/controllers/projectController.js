const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Project = require('../models/projectModel');

//@desc get user projects
//@Route GET /api/projects
//@access Private
const getProjects = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const projects = await Project.find({ user: req.user.id });

  res.status(200).json(projects);
});

//@desc get user projects
//@Route GET /api/projects/:id
//@access Private
const getProject = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(project);
});

//@desc Creat new project
//@Route POST /api/projects
//@access Private
const createProject = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const project = await Project.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(project);
});

//@desc Delete Project
//@Route DELTE /api/projects/:id
//@access Private
const deleteProject = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await project.remove();

  res.status(200).json({ success: true });
});

//@desc Update project
//@Route PUT /api/projects/:id
//@access Private
const updateProject = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProject);
});

module.exports = {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
};
