const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    job_link: {
      type: String,
    },
    interviewer_name: {
      type: String,
    },
    date: {
      type: Date,
    },
    pitch: {
      type: String,
    },
    why_me1: {
      type: String,
    },
    why_me2: {
      type: String,
    },
    why_me3: {
      type: String,
    },
    description: {
      type: String,
    },
    research_notes: {
      type: String,
    },
    questions: {
      type: String,
    },
    desired_salary: {
      type: String,
    },
    stages: {
      type: String,
      required: true,
      enum: ['First', 'Second', 'Third', 'Fourth', 'Final', 'Not Selected'],
      default: 'First',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Interview', interviewSchema);
