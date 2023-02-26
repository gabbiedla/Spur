const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const IntNote = require('../models/intnoteModel');
const Project = require('../models/projectModel');
const Interview = require('../models/interviewModel');

//@desc get notes for a ticket
//@Route GET /api/projects/:projectId/notes
//@access Private
const getIntNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.findById(req.params.interviewId);

  if (interview.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const intnotes = await IntNote.find({ interview: req.params.interviewId });
  res.status(200).json(intnotes);
});

//@desc create ticket note
//@Route POST /api/projects/:projectId/notes
//@access Private
const addIntNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.findById(req.params.interviewId);

  if (interview.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const intnote = await IntNote.create({
    text: req.body.text,
    isStaff: false,
    interview: req.params.interviewId,
    user: req.user.id,
  });
  res.status(200).json(intnote);
});

module.exports = {
  getIntNotes,
  addIntNote,
};
