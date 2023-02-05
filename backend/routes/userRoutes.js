const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

//register route

//this one is a post request
//to use this in our server.js, we have to create and endpoint (connect to that file)
router.post('/', registerUser);
// router.post('/', (req, res) => {
//   res.send('Register route');
// });

router.post('/login', loginUser);
router.get('/me', protect, getMe);

//exporting the router
module.exports = router;
