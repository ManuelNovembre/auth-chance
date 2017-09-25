module.exports = function(app, passport) {
    var mongoose = require('mongoose');    
    mongoose.connect("mongodb://localhost/db_chance"); // connect to our database
    var Candidate = require('../app/models/candidate');
    
        // HOME PAGE 
        app.get('/', function(req, res) {
            res.render('index.ejs');
        });
    
        // LOGIN PAGE
        app.get('/login', function(req, res) {
                res.render('login.ejs', { message: req.flash('loginMessage') }); 
        });     

        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', 
            failureRedirect : '/login', 
            failureFlash : true 
        }));

        // PROFILE SECTION 
        app.get('/profile', isLoggedIn, function(req, res) {
            Candidate.find({}, 
                function (err, result){
                    if ( err ){
                        res.render('profile.ejs', {
                            user    : req.user // get the user out of session and pass to template*                        
                        }); 
                        throw err;
                    }else{
                        res.render('profile.ejs', {
                            user    : req.user, // get the user out of session and pass to template*
                            candidates  : result
                        }); 
                    }    
                });
        });
    
        // LOGOUT 
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
        //CANDIDATES
        app.get('/candidates', function(req, res) {
            Candidate.find({}, 
                function (err, result){
                    if ( err ){
                        throw err;
                    }else{
                        res.render('candidates.ejs', {
                            candidates  : result
                        }); 
                    }    
                }); 
            });
    };
    
    // route middleware to make sure a  is logged in
    function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
    