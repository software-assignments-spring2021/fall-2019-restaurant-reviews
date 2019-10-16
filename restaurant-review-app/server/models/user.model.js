const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3
    }
    // lastName: {
    //     type: String,
    //     required: true,
    //     default: ''

    // },
    // email: {
    //     type: String,
    //     required: true,
    //     default: ''

    // },
    // isDeleted: {
    //     type: Boolean,
    //     default: ''

    // }
},{
    timestamps: true,

});

const User = mongoose.model('User',userSchema);

module.exports = User;