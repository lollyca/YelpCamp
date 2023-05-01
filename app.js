// const Joi = require('joi');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


// https://mongoosejs.com/docs/connections.html
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // userCreateIndex: true, - its no longer supported option
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);

app.get('/', (req, res) => {
    res.render('home');
});

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
