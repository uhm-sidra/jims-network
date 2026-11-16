const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @route   GET /api/users
// @desc    Get all students and alumni for Directory & Suggestions
router.get('/', async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = {};

    if (role && role !== 'All') {
      query.role = role.toLowerCase();
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching directory', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get single user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error: error.message });
  }
});

// @route   PATCH /api/users/:id/connect
// @desc    Toggle connection with user
router.patch('/:id/connect', async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle connection state (sample demo toggle)
    // In a full multi-user DB this manages sender and receiver IDs
    res.json({ success: true, message: 'Connection updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating connection', error: error.message });
  }
});

module.exports = router;
