const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({


    name:{
        type: String,
        required: true,

    },

    location:{
        type: String,
        required: true
    },

    reviews:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Review'}
    ]
    
    

},{timestamps:true})

const Restaurant = mongoose.model('Restaurant',restaurantSchema);

module.exports = Restaurant;