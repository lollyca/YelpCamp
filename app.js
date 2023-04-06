const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campground');

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

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
});

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

app.post('/campgrounds', async (req, res) => {
    //without parse.body we can't see a thing =P
    //res.send(req.body);
    //Ok, after looking what req.body was, lets create a new Camground and save
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
});

app.get('/campgrounds/:id', async (req, res) => {
    //we findById to get exacly the one from the loop in the index.ejs file
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', { campground })
});

app.listen(3000, () => {
    console.log('Listening on Port 3000');
});



//Learning:
//We use async functions when we need to look up our database first to continue doing things

