const { isLoggedIn, isAuthor, validatedCampground } = require('../middleware');
const cathcAsync = require('../utils/cathAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const express = require('express');
const router = express.Router();

router.get('/', cathcAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.post('/', isLoggedIn, validatedCampground, cathcAsync(campgrounds.createCampground));

router.get('/:id', cathcAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, cathcAsync(campgrounds.renderEditForm));

//#update
router.put('/:id', isLoggedIn, validatedCampground, cathcAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, cathcAsync(campgrounds.deleteCampground));

module.exports = router;


/*Learning:
We use async functions when we need to look up our database first to continue doing things

#update  ---  After seting up the route for edit we need to ACTUALLY update the thing, thats why we have #update right bellow

#2:
without parse.body we can't see a thing =P
Ok, after looking what req.body was, lets create a new Camground and save
if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
*/

