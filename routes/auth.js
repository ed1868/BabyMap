// AUTH.JS CONFIG

const express        = require('express');
const bcrypt         = require('bcrypt');
const path           = require('path');


const bcryptSalt     = 10;
const passportRouter = express.Router();
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const passport       = require('passport');
const LocalStrategy  = require('passport-local').Strategy;

const ensureLogin    = require('connect-ensure-login');
const User           = require('../models/User');

const router  = express.Router();

// USER PROFILE ROUTE
router.get('/user-profile', ensureLogin.ensureLoggedIn(), (req, res) => {
  const userID    = req.user.id;
  const username  = req.user.username;
  User.find({})
    .then((users) => {
      res.render('auth/userProfile', {
        users,  userId : req.user.id, username : req.user.username,
      });
    });
});


// USER LOG IN ROUTES
router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true,
  passReqToCallback: true,
}));


// USER SIGN UP ROUTES
router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
  const username = req.body.username;
  console.log(username);
  const password = req.body.password;
  console.log(password);
  if (username === '' || password === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }

  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser.save()
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.render('auth/signup', { message: 'Something went wrong' });
      });
  });
});


// USER LOG OUT ROUTE
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
