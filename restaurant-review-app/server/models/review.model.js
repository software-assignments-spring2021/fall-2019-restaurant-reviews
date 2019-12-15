//import MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create newReview Schema
const reviewSchema = new Schema(
    {
      dishname: {
        type: String,
        required: true
      },
  
      rating: { type: Array, required: true },
  
      comments: {
        type:Array,
        reuqired: true
      }
    },
    {
      timestamps: false
    }
  );
  
  mongoose.model('newreviews',reviewSchema);
  
  module.exports = Review;