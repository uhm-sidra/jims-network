const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an internship title'],
      trim: true,
    },
    company: {
      type: String,
      required: [true, 'Please provide the company name'],
      trim: true,
    },
    location: {
      type: String,
      default: 'Remote',
    },
    type: {
      type: String,
      default: 'Internship (3 Months)',
    },
    stipend: {
      type: String,
      default: 'Unpaid / Stipend on Performance',
    },
    deadline: {
      type: String,
      default: 'Open until filled',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    applicants: {
      type: [String], // Array of applicant user IDs or emails
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Internship', internshipSchema);
