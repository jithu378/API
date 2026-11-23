
const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    useremail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    userpassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userschema);
