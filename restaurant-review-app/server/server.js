const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 6000;


app.use(cors());
app.use(express.json());




const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true }
);

// mongoose.connect(uri, {useUnifiedTopology: true,useNewUrlParser: true,})
//     .then(() => console.log('DB Connected!'))
//     .catch(err => {
//     console.log('DB Connection Error: ${err.message}');
// });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database is connected successfully");
})




const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});
