//import files
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();


//setup localhost port to be 5000
const port = process.env.PORT || 5000;

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

app.use(express.static("../client/build"));
app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

//for testing
module.exports = app;