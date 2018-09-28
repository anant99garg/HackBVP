var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    name: String,
    organisation: String,
    email: String,
    password: String,
    phonenumber: Number,
    address: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("NewUser", userSchema);