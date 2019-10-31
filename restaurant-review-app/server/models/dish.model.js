const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create dish schema
dishSchema = new Schema({

    username:{
        type: String, 
        required: true
    },

    rating:{type: Int8Array,required:true},

    comments:[
        {type:mongoose.Schema.Types.ObjectId, ref:'Review'}
    ]
    

},{
    timestamps:true
})

//export dish schema

const Dish = mongoose.model('Dish',dishSchema);

module.exports = Dish;