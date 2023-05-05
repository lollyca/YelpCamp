const { validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const cathcAsync = require('../utils/cathAsync');
const review = require('../controllers/reviews');
const Campground = require('../models/campground');
const Review = require('../models/review');
const express = require('express');
const router = express.Router({mergeParams: true});

router.post('/', isLoggedIn, validateReview, cathcAsync(review.createReview));

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, cathcAsync(review.deleteReview));

module.exports = router;