// get all the tools neeeded
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var Coach = require('./app/models/coach');
var Candidate = require('./app/models/candidate');

// configuration 
mongoose.connect("mongodb://localhost/db_chance"); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


//Seed database with coaches
var newCoach =  new Coach();
require('fs').readFile('./json/coaches.json', 'utf8', function (err, data) {
    if (err) 
        console.error("Can't load coaches data");
    var json = JSON.parse(data);
    for (i in json){
        newCoach = Coach({
            local            : {
                email        : json[i].email,
                password     : newCoach.generateHash(json[i].password),
            }
        });
        // save the user
        newCoach.save(function(err) {
            if (err) throw err;
                console.log('coach saved!');
        });
      
    }
});

//Seed database with candidates
var newCandidate =  new Candidate();
require('fs').readFile('./json/candidates.json', 'utf8', function (err, data) {
    if (err) 
        console.error("Can't load candidates data");
    var json = JSON.parse(data);
    for (i in json){
        newCandidate = Candidate({
            name    : json[i].name,
            surname : json[i].surname,
        });
        // save the candidate
        newCandidate.save(function(err) {
            if (err) throw err;
                console.log('Candidate saved!');
        });
      
    }
});
// routes 
require('./app/routes.js')(app, passport);

// launch 
app.listen(port);
