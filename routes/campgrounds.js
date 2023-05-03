const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

const cathcAsync = require('../utils/cathAsync');
const ExpressError = require('../utils/ExpressError');

const Campground = require('../models/campground');

const express = require('express');
const router = express.Router();

// --------------------------------------------------------------------
const validatedCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};
// --------------------------------------------------------------------

router.get('/', cathcAsync(async (req, res) => {

    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validatedCampground, cathcAsync(async (req, res, next) => {
    //without parse.body we can't see a thing =P
    //res.send(req.body);
    //Ok, after looking what req.body was, lets create a new Camground and save
    //if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', cathcAsync(async (req, res) => {
    //we findById to get exacly the one from the loop in the index.ejs file
    const campground = await Campground.findById(req.params.id).populate('reviews').populate('author');
    if (!campground) {
        req.flash('error', 'Campground Not Found');
        res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, cathcAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
}));

//#update
router.put('/:id', isLoggedIn, validatedCampground, cathcAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    req.flash('success', 'Successfully updated campground');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, cathcAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted Campground');
    res.redirect('/campgrounds');
}));

module.exports = router;


//Learning:
//We use async functions when we need to look up our database first to continue doing things
//#update  ---  After seting up the route for edit we need to ACTUALLY update the thing, thats why we have #update right bellow

