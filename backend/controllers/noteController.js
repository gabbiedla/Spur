const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Project = require('../models/projectModel');

//@desc get notes for a ticket
//@Route GET /api/projects/:projectId/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const project = await Project.findById(req.params.projectId);

  if (project.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ project: req.params.projectId });
  res.status(200).json(notes);
});

module.exports = {
  getNotes,
};
