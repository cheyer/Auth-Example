//var express = require('express');
//var router = express.Router();

module.exports = function(app, passport) {

/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Node Passport Authentication' });
});

/* GET login page */
app.get('/login', isLoggedOut, function(req, res) {
  res.render('login', {message: req.flash('loginMessage')});
});

/* POST login form */
app.post('/login', passport.authenticate('local-login',{
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

/* GET signup page */
app.get('/signup', isLoggedOut, function(req, res) {
  res.render('signup', {message: req.flash('signupMessage')});
});

/* POST signup form */
app.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

/* GET profile page */
// we will want this protected so you have to be logged in to visit
// we will use route middleware to verify this (the isLoggedIn function)
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile',{
    user : req.user
  });
});

/* GET logout */
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
};

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/');
  }
}

function isLoggedOut(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }else{
    res.redirect('/profile');
  }
}

//module.exports = router;
