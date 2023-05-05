const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //I want to pull from the reviews array reviewID (how to read this line) -- if you want to google it: remove from array mongo
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a Review');
    res.redirect(`/campgrounds/${id}`);

};