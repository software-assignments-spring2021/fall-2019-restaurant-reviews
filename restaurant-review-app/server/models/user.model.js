//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create User schema
const userSchema = new Schema({

    firstname: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    lastname: {

        type: String,
        required: true,
      
        trim: true,
        minlength: 1

    },

    email: {
        type: String,
        unique: true,
        required: true,
        default: ''

    },
    password:{
        type:String,
        required:true,
    },

    favoriteRes:{
        type: [String],
    },

    comments:[{
        dishname: {
            type: String,
            required: true
          },    
          rating: { type: Number, required: true },
          comment: {
            type:String,
            reuqired: true
          }
    }]


},{
    timestamps: true,

});


//export User schema

const User = mongoose.model('User',userSchema);

module.exports = User;