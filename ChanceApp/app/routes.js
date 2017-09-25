module.exports = function(app, passport) {
    
        // HOME PAGE 
        app.get('/', function(req, res) {
            res.render('index.ejs');
        });
    
        // LOGIN PAGE
        app.get('/login', function(req, res) {
                res.render('login.ejs', { message: req.flash('loginMessage') }); 
        });
    
        // PROFILE SECTION 
        app.get('/profile', isLoggedIn, function(req, res) {
            res.render('profile.ejs', {
                user : req.user // get the user out of session and pass to template
            });
        });
    
        // LOGOUT 
        app.get('/logout', function(req, res) {
            req.logout();
            res.redirect('/');
        });
        
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', 
            failureRedirect : '/login', 
            failureFlash : true 
        }));
    };
    
    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {
    
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
    
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
    