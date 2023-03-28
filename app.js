const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', (req, res) => {
    res.render('home');
})

app.get('/', (req, res) => {
    res.send('OLAAAAAAAA');
})

app.listen(3000, () => {
    console.log('Listening on Port 3000');
})