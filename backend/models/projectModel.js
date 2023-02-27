const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    // product: {
    //   type: String,
    //   required: [true, 'Please select a product'],
    //   enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    // },
    // description: {
    //   type: String,
    //   required: [true, 'Please enter a description of the issue'],
    // },
    title: {
      type: String,
    },
    date: {
      type: Date,
    },
    company: {
      type: String,
    },
    summary: {
      type: String,
    },
    situation: {
      type: String,
    },
    task: {
      type: String,
    },
    action: {
      type: String,
    },
    resolution: {
      type: String,
    },
    impact: {
      type: String,
    },
    stakeholders: {
      type: String,
    },
    metrics: {
      type: String,
    },
    takeaways: {
      type: String,
    },
    tag: {
      type: String,
      enum: ['Ops Process', 'Web', 'Mobile', 'Other'],
    },
    resources: {
      type: String,
    },
    files: {
      type: String,
    },
    // status: {
    //   type: String,
    //   required: true,
    //   enum: ['new', 'open', 'closed'],
    //   default: 'new',
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Project', projectSchema);
