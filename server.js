//--------------------modules------------------
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var express = require('express');
var app = express();
var path = require('path'); //
//-------------------config--------------------
//config files
var db = require('./config/db');
//port config
var port = process.env.PORT || 8080;
//database this credencial is for local database
mongoose.connect(db.url);
//parse verbs
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules'))) //node modules serving
app.use('/public', express.static(path.join(__dirname, 'public'))) //angular files serving
app.use(morgan('dev'));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
    next();
});


// routes ==================================================
require('./api/routes')(app); // configure our routes



// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('rocking on ' + port);

// expose app           
exports = module.exports = app;