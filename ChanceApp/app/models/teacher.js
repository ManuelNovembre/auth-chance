var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

//teacher model schema
var teacherSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    }
});

// Hiding password
teacherSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
teacherSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('teacher', teacherSchema);
