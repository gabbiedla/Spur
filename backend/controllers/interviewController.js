const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Project = require('../models/projectModel');
const Interview = require('../models/interviewModel');

//@desc get user interviews
//@Route GET /api/interviews
//@access Private
const getInterviews = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interviews = await Interview.find({ user: req.user.id });

  res.status(200).json(interviews);
});

//@desc get user interview
//@Route GET /api/interviews/:id
//@access Private
const getInterview = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    res.status(404);
    throw new Error('Interview not found');
  }

  if (interview.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json(interview);
});

//@desc Creat new interview
//@Route POST /api/interview
//@access Private
const createInterview = asyncHandler(async (req, res) => {
  const {
    role,
    company,
    link,
    interviewer_name,
    date,
    pitch,
    why1,
    why2,
    why3,
    description,
    info,
    questions,
    desired_salary,
    stage,
  } = req.body;

  // if (!project || !description) {
  //   res.status(400);
  //   throw new Error('Please add a product and description');
  // }

  if (!role) {
    res.status(400);
    throw new Error('Please add a job role');
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.create({
    role,
    company,
    link,
    interviewer_name,
    date,
    pitch,
    why1,
    why2,
    why3,
    description,
    info,
    questions,
    desired_salary,
    user: req.user.id,
    stage: 'First',
  });

  res.status(201).json(interview);
});

//@desc Delete Interview
//@Route DELTE /api/interview/:id
//@access Private
const deleteInterview = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    res.status(404);
    throw new Error('Interview not found');
  }

  if (interview.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await interview.remove();

  res.status(200).json({ success: true });
});

//@desc Update interivew
//@Route PUT /api/interviews/:id
//@access Private
const updateInterview = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const interview = await Interview.findById(req.params.id);

  if (!interview) {
    res.status(404);
    throw new Error('Interview not found');
  }

  if (interview.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedInterview = await Interview.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedInterview);
});

module.exports = {
  getInterviews,
  getInterview,
  createInterview,
  deleteInterview,
  updateInterview,
};
