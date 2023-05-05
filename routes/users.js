const express = require('express');
const router = express.Router();
const passport = require('passport');
const cathcAsync = require('../utils/cathAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.get('/register', users.renderRegister);

router.post('/register', cathcAsync(users.register));

router.get('/login', users.renderLogin);

router.post("/login", users.login);

//* Passport.js update
router.get('/logout', users.logout);

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