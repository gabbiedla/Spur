const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 8000;

//connect to database
connectDB();

const app = express();

//middleware will allow us to send raw json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//create a rout with express use get method

app.get('/', (req, res) => {
  //this message is for ppl who go to the root url (see the slash above) they will see this welcome message
  res.status(200).json({ message: 'Welcome to the Spur app API' });
});

//Routes (end point)
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
