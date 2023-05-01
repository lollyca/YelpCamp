const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const morgan = require('morgan');
const ejsMate = require('ejs-mate');
const cathcAsync = require('./utils/cathAsync');
const ExpressError = require('./utils/ExpressError');
const Joi = require('joi');
const {campgroundSchema, reviewSchema} = require('./schemas.js');
const Review = require('./models/review');

const campgrounds = require('./routes/campgrounds');

// https://mongoosejs.com/docs/connections.html
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // userCreateIndex: true, - its no longer supported option
    useUnifiedTopology: true
});

//after mongoose.connecet we connect the db mongo with mongoose and check if we have errors
//PS: rever aula 379 'Connecting Mongoose' if any questions
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



const validateReview = (req,res,next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message). join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
};

app.use('/campgrounds', campgrounds);

app.get('/', (req, res) => {
    res.render('home');
});



app.post('/campgrounds/:id/reviews',validateReview, cathcAsync(async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

app.delete('/campgrounds/:id/reviews/:reviewId', cathcAsync (async (req, res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}}); //I want to pull from the reviews array reviewID (how to read this line) -- if you want to google it: remove from array mongo
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);

}));

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'something went wrong baby' } = err;
    if(!err.message) err.message = 'Oh No, Something went wrong BOY'
    res.status(statusCode).render('error', { err });
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});
