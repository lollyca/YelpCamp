const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/cathAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login', failureMessage: true, keepSessionInfo: true, }), users.login)

router.get('/logout', users.logout) //* Passport.js update

module.exports = router;

/*
 Passport.js update: 
 - The req.logout() method now requires a callback function passed as an argument 
 router.get('/logout', (req, res) => {
     req.logout();
     req.flash('success', "Goodbye!");
     res.redirect('/campgrounds');
 })
*/