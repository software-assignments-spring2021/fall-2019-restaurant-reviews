//import mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create review schema
reviewSchema = new Schema({
    username:{
        type: String, 
        ref: 'Users',
        required: true
    },

    reviewTime:{
        type: Date
    },
    
    content:{
        type: String
    }

},{
    timestamps:true
})

//export review schema

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;