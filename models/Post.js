const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      default: 'Student Member',
    },
    authorType: {
      type: String,
      enum: ['student', 'alumni', 'official'],
      default: 'student',
    },
    avatar: {
      type: String,
      default: 'SM',
    },
    content: {
      type: String,
      required: [true, 'Post content cannot be empty'],
      trim: true,
    },
    tags: {
      type: [String],
      default: ['General'],
    },
    likes: {
      type: [String], // stores user IDs or identifiers who liked the post
      default: [],
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
