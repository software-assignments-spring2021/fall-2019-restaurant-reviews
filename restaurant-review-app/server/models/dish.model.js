const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create dish schema
dishSchema = new Schema({

    username:{
        type: String, 
        required: true
    },

    reviews:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Review'}
    ]
    

},{
    timestamps:true
})

//export dish schema

const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;