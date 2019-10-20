//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create User schema
const userSchema = new Schema({

    firstname: {
        type: String,
        required: true,
       
        trim: true,
        minlength: 3
    },

    lastname: {

        type: String,
        required: true,
      
        trim: true,
        minlength: 2

    },

    email: {
        type: String,
        required: true,
        default: ''

    },
    password:{
        type:String,
        required:true,

    },
    password1:{
        type: String,
        required: true
    }
},{
    timestamps: true,

});


//export User schema

const User = mongoose.model('User',userSchema);

module.exports = User;