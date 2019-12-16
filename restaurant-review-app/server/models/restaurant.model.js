//import MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const restaurantSchema = new Schema(
  {
    name:{
      type: String,
      required: true
    },

    address:{
      type: String,
      required: true
    },

    rating:{
      type: Number,
      required: true
    },

    cuisine:{
      type: String,
      required: false
    },

    menu:{
      type:Array,
      required: true
    },

    reviews:{
      type: Array,
      required: true
    },

    menu_items: {
      type: Object,
      required: true
    },
    new_reviews:[{
      dishname: {
        type: String,
        required: true
      },
  
      ratings: { type: Array, required: true },
  
      comments: {
        type:Array,
        reuqired: true
      }
    }]
  },

  { timestamps: false }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
