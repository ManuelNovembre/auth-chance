var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//candidate model schema
var candidateSchema = mongoose.Schema({
    name        : String,
    surname     : String
});

module.exports = mongoose.model('candidate', candidateSchema);