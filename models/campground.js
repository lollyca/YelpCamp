const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    title: String,
    name: String,
    price: Number,
    description: String,
    location: String,
    image: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Camp = mongoose.model('Camp', CampgroundSchema);
module.exports = Camp;