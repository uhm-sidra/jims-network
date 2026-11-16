const express = require('express');
const Internship = require('../models/Internship');

const router = express.Router();

// @route   GET /api/internships
// @desc    Get all internship & job listings
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching internships', error: error.message });
  }
});

// @route   POST /api/internships
// @desc    Post a new internship (by Alumni or Faculty/Cell)
router.post('/', async (req, res) => {
  try {
    const { title, company, location, type, stipend, deadline, skills, description } = req.body;

    if (!title || !company || !description) {
      return res.status(400).json({ message: 'Title, company, and description are required' });
    }

    const newInternship = await Internship.create({
      title,
      company,
      location: location || 'Remote',
      type: type || 'Internship (3 Months)',
      stipend: stipend || 'Stipend based on performance',
      deadline: deadline || 'Open',
      skills: Array.isArray(skills) ? skills : (skills ? skills.split(',').map((s) => s.trim()) : []),
      description,
      applicants: [],
    });

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(500).json({ message: 'Error creating internship', error: error.message });
  }
});

// @route   PATCH /api/internships/:id/apply
// @desc    Toggle applying to an internship
router.patch('/:id/apply', async (req, res) => {
  try {
    const { userEmail } = req.body;
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    const applicantId = userEmail || 'demo_student@jimsindia.org';
    const index = internship.applicants.indexOf(applicantId);

    let isApplied = false;
    if (index === -1) {
      internship.applicants.push(applicantId);
      isApplied = true;
    } else {
      internship.applicants.splice(index, 1);
      isApplied = false;
    }

    await internship.save();
    res.json({ success: true, isApplied, applicantsCount: internship.applicants.length });
  } catch (error) {
    res.status(500).json({ message: 'Error updating application', error: error.message });
  }
});

module.exports = router;
