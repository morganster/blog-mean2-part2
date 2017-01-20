// Load required model
var User = require('../models/user');
var Auth = require('../controllers/Auth');

// method to post users /api/users
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    });

    user.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'user created succesfull' });
    });
};

// method to get users /api/users
exports.getUsers = function(req, res) {
    //console.log(req);

    User.find(function(err, users) {
        if (err)
            res.send(err);
        res.json(users);
    });
};

// create a test user
exports.setupUser = function(req, res) {
    var mates = new User({
        name: 'Edward Teach',
        username: 'blackbeard3',
        password: 'oak island'
    });
    //586eba2ad6c69420809e2862

    mates.save(function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });

};
