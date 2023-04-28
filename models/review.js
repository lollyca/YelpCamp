const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating: Number
});

module.exports = mongoose.model('Review', reviewSchema);

//this is going to be an one to many relationship between 1 campground to many reviews
//so it means that we need to update the campground model as well, to support this new connection