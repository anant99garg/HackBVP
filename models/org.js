var mongoose = require('mongoose');

var orgSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    namep: String,
    guardianname: String,
    phonenumberg: Number,
    critical: String,
    condition: String,
    affected:String,
    
});

module.exports = mongoose.model("organisationData", orgSchema);