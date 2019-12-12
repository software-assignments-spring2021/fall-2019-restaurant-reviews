//import MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The restaurant schema includes name, location, dishSchema

//create dish schema
// const dishSchema = new Schema(
//   {
//     dishname: {
//       type: String,
//       required: true
//     },

//     rating: { type: Number, required: true },

//     comments: [String]
//   },
//   {
//     timestamps: false
//   }
// );

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
    }
  },

  { timestamps: false }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
