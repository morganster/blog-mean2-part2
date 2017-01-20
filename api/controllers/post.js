var Post = require("../models/post");

exports.postPosts = function(req, res) {
    // Set the post properties that came from the POST data
    console.log(req.body);
    var post = new Post({
        title: req.body.title,
        body: req.body.body,
        _author: req.user.id
    });


    // Save the post and check for errors
    post.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'post published!!', data: post });
    });
}

exports.getPosts = function(req, res) {
    //get all post with the basic data of the author
    Post.find().populate('_author', 'name username').sort([
        ['create_at', 'descending']
    ]).exec(function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
}
exports.getUserPosts = function(req, res) {
    //get all post
    Post.find({ '_author': req.user.id }).populate('_author', 'name').exec(function(err, posts) {
        if (err)
            res.send(err);

        res.json(posts);
    });
}
