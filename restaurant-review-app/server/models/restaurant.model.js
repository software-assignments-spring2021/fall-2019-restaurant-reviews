//import MongoDB
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The restaurant schema includes name, location, dishSchema

//create dish schema
const dishSchema = new Schema(
  {
    dishname: {
      type: String,
      required: true
    },

    rating: { type: Number, required: true },

    comments: [String]
  },
  {
    timestamps: false
  }
);

const restaurantSchema = new Schema(
  {
    // name: {
    //   type: String,
    //   required: true
    // },
    // location: {
    //   type: String,
    //   required: true
    // },
    // dishes: [dishSchema],
    menu_items: {
      type: Object,
      required: true
    }
  },

  { timestamps: false }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
