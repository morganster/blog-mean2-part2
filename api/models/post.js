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
    }


});

module.exports = mongoose.model('Post', PostSchema);