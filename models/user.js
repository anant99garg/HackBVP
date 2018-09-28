var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    longitude: String,
    latitude: String,
    organisation: String,
    email: String,
    password: String,
    phonenumber: Number,
    address: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("NewUser", userSchema);