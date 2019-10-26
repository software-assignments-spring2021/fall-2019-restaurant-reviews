//import files
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();


//setup localhost port to be 6000
const port = process.env.PORT || 6000;

//middleware 
app.use(cors());
app.use(express.json());
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}))
//passport config
require('./config/passport')(passport);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//connect with MongoDB 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true }
);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database is connected successfully");
})



//Router 
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');


app.use('/user', userRouter);
app.use('/restaurant', restaurantRouter);


//show the server status
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});

//for testing
module.exports = app;