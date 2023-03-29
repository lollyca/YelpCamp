const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    name: String,
    price: String,
    description: String,
    location: String
});

const Camp = mongoose.model('Camp', CampgroundSchema);
module.exports = Camp;