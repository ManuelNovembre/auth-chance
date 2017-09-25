var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//coach model schema
var coachSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    }
});

// Hiding password
coachSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
coachSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('coach', coachSchema);
