const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all community posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error: error.message });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
router.post('/', async (req, res) => {
  try {
    const { author, authorType, role, avatar, content, tags } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    const newPost = await Post.create({
      author: author || 'Student Member',
      authorType: authorType || 'student',
      role: role || 'MCA Student',
      avatar: avatar || 'SM',
      content: content.trim(),
      tags: tags && tags.length ? tags : ['General'],
      likes: [],
      likesCount: 0,
      comments: [],
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error: error.message });
  }
});

// @route   PATCH /api/posts/:id/like
// @desc    Toggle like on a post
router.patch('/:id/like', async (req, res) => {
  try {
    const { userId } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Identify user by id or generic session marker
    const identifier = userId || 'current_user';
    const index = post.likes.indexOf(identifier);

    if (index === -1) {
      // Like
      post.likes.push(identifier);
    } else {
      // Unlike
      post.likes.splice(index, 1);
    }

    post.likesCount = post.likes.length;
    await post.save();

    res.json({
      success: true,
      likesCount: post.likesCount,
      isLiked: post.likes.includes(identifier),
    });
  } catch (error) {
    res.status(500).json({ message: 'Error toggling like', error: error.message });
  }
});

// @route   POST /api/posts/:id/comments
// @desc    Add a comment to a post
router.post('/:id/comments', async (req, res) => {
  try {
    const { author, text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text cannot be empty' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const comment = {
      author: author || 'Current Student',
      text: text.trim(),
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error: error.message });
  }
});

module.exports = router;
