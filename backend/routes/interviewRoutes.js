const express = require('express');
const router = express.Router();
const {
  getInterviews,
  getInterview,
  createInterview,
  deleteInterview,
  updateInterview,
} = require('../controllers/interviewController');

const { protect } = require('../middleware/authMiddleware');
const { update } = require('../models/userModel'); //what is this

//reroute into note router
const intnoteRouter = require('./intnoteRoutes');
router.use('/:interviewId/intnotes', intnoteRouter);

router.route('/').get(protect, getInterviews).post(protect, createInterview);

router
  .route('/:id')
  .get(protect, getInterview)
  .delete(protect, deleteInterview)
  .put(protect, updateInterview);

module.exports = router;
