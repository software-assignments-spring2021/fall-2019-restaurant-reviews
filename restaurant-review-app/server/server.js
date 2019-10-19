//import express cors and mongoose
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();


//setup localhost port to be 6000
const port = process.env.PORT || 6000;


app.use(cors());
app.use(express.json());



//connect with MongoDB 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true }
);


const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database is connected successfully");
})



//Router 
const usersRouter = require('./routes/user');
const restaurantsRouter = require('./routes/restaurants');


app.use('/user', usersRouter);
app.use('/restaurants', restaurantRouter);


//show the server status
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});
