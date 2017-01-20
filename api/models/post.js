var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    _author: {
        type: String,
        ref: 'User'
    },
    create_at: {
        type: Date
    }


});

PostSchema.pre('save', function(next) {
    now = new Date();
    if (!this.create_at) {
        this.create_at = now;
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);
