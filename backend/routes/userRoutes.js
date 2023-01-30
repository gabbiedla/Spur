const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

//register route

//this one is a post request
//to use this in our server.js, we have to create and endpoint (connect to that file)
router.post('/', registerUser);
// router.post('/', (req, res) => {
//   res.send('Register route');
// });

router.post('/', loginUser);

//exporting the router
module.exports = router;
