// app/routes.js

// grab the controllers
var userController = require('./controllers/user');
var postController = require('./controllers/post');
var authController = require('./controllers/auth');
var path = require('path');


module.exports = function(app) {
    // set the api routes
    app.route('/api/users')
        .get(authController.authenticate(), userController.getUsers)
        .post(authController.authenticate(), userController.postUsers);

    app.route('/api/users_post')
        .get(authController.authenticate(), postController.getUserPosts)

    app.route('/api/posts')
        .get(postController.getPosts)
        .post(authController.authenticate(), postController.postPosts);

    app.route('/api/login')
        .post(authController.login, function(req, res) {
            req.logout();
            res.json();

        });
    //create a sample user
    app.route('/setup')
        .get(userController.setupUser);






    // frontend routes =========================================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });


};
