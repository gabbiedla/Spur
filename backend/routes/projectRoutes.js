const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} = require('../controllers/projectController');

const { protect } = require('../middleware/authMiddleware');
const { update } = require('../models/userModel'); //what is this

//reroute into note router
const noteRouter = require('./noteRoutes');
router.use('/:projectId/notes', noteRouter);

router.route('/').get(protect, getProjects).post(protect, createProject);

router
  .route('/:id')
  .get(protect, getProject)
  .delete(protect, deleteProject)
  .put(protect, updateProject);

module.exports = router;
