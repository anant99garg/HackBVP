var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var organisationSchema = new mongoose.Schema({
    name: String,
    condition: String,
    critical: Boolean,
    guardianname: String,
    phonenumber: Number
});

organisationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("organisationData", organisationSchema);