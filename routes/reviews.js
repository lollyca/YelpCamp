const { validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const cathcAsync = require('../utils/cathAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/', isLoggedIn, validateReview, cathcAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, cathcAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //I want to pull from the reviews array reviewID (how to read this line) -- if you want to google it: remove from array mongo
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a Review');
    res.redirect(`/campgrounds/${id}`);

}));

module.exports = router;