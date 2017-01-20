//get the instance of mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

//setup de model and pass it ussing module.exports

var UserSchema = new Schema({
    name: String,
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }


});

//hash the user password

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

//compare password

UserSchema.methods.comparePassword = function(pw, bc) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return bc(err);
        }
        bc(null, isMatch);
    });
};




module.exports = mongoose.model('User', UserSchema);
