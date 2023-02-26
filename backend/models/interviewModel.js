const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    role: {
      type: String,
    },
    company: {
      type: String,
    },
    link: {
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
      default:
        'I am a product manager in the B2B space. As a former operations leader in micromobility, I have experience in market launches, managing image recognition product tools, and scaling international support teams. I enjoy working on web development projects outside of work.',
    },
    why1: {
      type: String,
    },
    why2: {
      type: String,
    },
    why3: {
      type: String,
    },
    description: {
      type: String,
    },
    info: {
      type: String,
    },
    questions: {
      type: String,
    },
    desired_salary: {
      type: Number,
    },
    stage: {
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
