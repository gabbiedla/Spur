// create functions

//register user

//@desc Register a new user
//@Route /api/users
//@access Public
const registerUser = (req, res) => {
  //   console.log(req.body);
  //desctuctire
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    // return res.status(400).json({ message: 'Please include all fields' });
    // insert error handling
    res.status(400);
    throw new Error('Please include all fields');
  }

  res.send('Register Route');
};

//@desc Login a user
//@Route /api/users/login
//@access Public
const loginUser = (req, res) => {
  res.send('Login Route');
};

//export
module.exports = {
  registerUser,
  loginUser,
};
