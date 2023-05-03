// const Joi = require('joi');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');

const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const userRoutes = require('./routes/users');


const app = express();
mongoose.set('strictQuery', false)
// ------------------------------------------------------------------------------
// https://mongoosejs.com/docs/connections.html
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // userCreateIndex: true, - its no longer supported option
    useUnifiedTopology: true,
    // useFindAndModify: false
});

//after mongoose.connecet we connect the db mongo with mongoose and check if we have errors
//PS: rever aula 379 'Connecting Mongoose' if any questions
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});
// ------------------------------------------------------------------------------

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// ------------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
// ------------------------------------------------------------------------------
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};
// ------------------------------------------------------------------------------
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//*
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// ------------------------------------------------------------------------------
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);
app.use('/', userRoutes);
// ------------------------------------------------------------------------------


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


//* ---- We are doing this middleware because we will have access to it in our templates automatically.
//       We don't have to pass it through on our routers
