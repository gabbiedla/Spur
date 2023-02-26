const express = require('express');
const router = express.Router({ mergeParams: true });
const { getIntNotes, addIntNote } = require('../controllers/intnoteController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getIntNotes).post(protect, addIntNote);

module.exports = router;

// /api/interview/:interviewtId/intnotes
