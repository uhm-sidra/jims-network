require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import modular routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/users', userRoutes);
app.use('/api/people', userRoutes); // Alias for compatibility

// Health check endpoint
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  const isMongoReady = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    phase: 'Phase 1 - Prototype & Architecture Showcase',
    database: isMongoReady ? 'connected' : 'disconnected (fallback store active)',
    timestamp: new Date(),
    message: 'JIMS Alumni Network API is running smoothly',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 JIMS Network Backend server running on http://localhost:${PORT}`);
});
